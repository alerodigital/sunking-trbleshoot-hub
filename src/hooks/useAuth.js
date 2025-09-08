import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { 
    doc, 
    setDoc, 
    getDoc,
    updateDoc 
  } from 'firebase/firestore';
import {auth, db} from '../services/firebase';
import { useState, useEffect } from 'react';


// Helper function to check if Firebase is configured
const isFirebaseConfigured = () => {
    return auth && typeof auth.app.options.apiKey === 'string' && auth.app.options.apiKey !== '';
  };

// Custom hook for authentication state
export const useAuthState = () =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        });
    
        return unsubscribe;
      }, []);

      return { user, loading };
}

export const useAuth = () => {
    const queryClient = useQueryClient();
    const { user: authUser, loading: authLoading } = useAuthState();

    // Get current user
// const useCurrentUser = () => {
//     return useQuery(
//         {
//             queryKey: ['currentUser'],
//             queryFn: async () => {

//                 return new Promise((resolve)=>{
                  

//                     const unsubscribe = onAuthStateChanged(auth, 
//                         async (user)=>{
//                         unsubscribe();

//                         //Get additional user data from Firestore
//                         if (user) {
//                             try {
//                                 const userDoc = await getDoc(doc(db, 'users', user.uid));
//                                 if (userDoc.exists()) {
//                                   resolve({
//                                     ...user,
//                                     userData: userDoc.data()
//                                   });
//                                 } else {
//                                   resolve(user);
//                                 }
//                             } catch (error){
//                                 console.error('Error fetching user data:', error);
//                                 resolve(user); // Return basic user info even if extended data fails
//                             }
//                         } else {
//                            resolve(user);  
//                         }
                       
//                     }, 
//                 (error)=>{
//                     unsubscribe();
//                     reject(error);
//                 })
//                 });
//             },
//             staleTime: 5 * 60 * 1000, //consider data fresh for 5 minutes
//             retry : 1,
//             enabled: isFirebaseConfigured(), // Only run query if Firebase is configured
//         }
//     )
// }

// Get current user with extended data
const useCurrentUser = () => {
    return useQuery({
      queryKey: ['currentUser'],
      queryFn: async () => {
        if (!authUser) return null;
        
        try {
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', authUser.uid));
          if (userDoc.exists()) {
            return {
              ...authUser,
              userData: userDoc.data()
            };
          }
          return authUser;
        } catch (error) {
          console.error('Error fetching user data:', error);
          return authUser; // Return basic user info even if extended data fails
        }
      },
      staleTime: 5 * 60 * 1000,
      enabled: !authLoading && !!authUser,
    });
  };

// Sign in mutation
const signInMutation = useMutation({
    mutationFn: async ({email, password}) => {
        try {
            if (!isFirebaseConfigured()) {
                throw new Error('Firebase is not configured. Please check your configuration.');
              }
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            return  userCredential.user;
        } catch (error){
            // Re-throw the error with the code for handling in components
            throw error;
        }
        
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['currentUser']});
    }
})

// Sign up mutation
const signupMutation = useMutation({
    mutationFn: async ({email, password, firstName, lastName}) => {
        // Create the user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update Firebase Auth profile with display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

        //store additional user data in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            firstName,
            lastName,
            email,
            displayName: `${firstName} ${lastName}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: 'user', // Default role
        emailVerified: false,
        });

        return user;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['currentUser']});
    }
});

// Update user profile mutation
const updateProfileMutation = useMutation({
    mutationFn: async ({ uid, updates }) => {
      // Update Firestore user document
      await updateDoc(doc(db, 'users', uid), {
        ...updates,
        updatedAt: new Date(),
      });
      
      // If display name is being updated, also update Firebase Auth
      if (updates.firstName || updates.lastName) {
        const displayName = `${updates.firstName || ''} ${updates.lastName || ''}`.trim();
        await updateProfile(auth.currentUser, {
          displayName
        });
      }
      
      return updates;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['currentUser']);
    },
  });

const signOutMutation = useMutation({
    mutationFn: () => signOut(auth),
    onSuccess: () => {
        queryClient.setQueryData(['currentUser'], null);
        queryClient.removeQueries(['faqs']);
    }
});

// Password reset mutation
const resetPasswordMutation = useMutation({
    mutationFn: async ({email}) => {
       await sendPasswordResetEmail(auth, email)
    }
})


return {
    useCurrentUser,
    signIn: signInMutation.mutateAsync,
    signUp: signupMutation.mutateAsync,
    updateProfile: updateProfileMutation.mutateAsync,
    signOut: signOutMutation.mutate,
    resetPassword: resetPasswordMutation.mutateAsync,
    isLoading: signInMutation.isLoading || signupMutation.isLoading || resetPasswordMutation.isLoading || updateProfileMutation.isLoading,
    authError: signInMutation.error || signupMutation.error || resetPasswordMutation.error || updateProfileMutation.error,
    authLoading, // Export the auth loading state
}


}

