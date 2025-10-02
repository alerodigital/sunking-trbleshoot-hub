import React from 'react'

const ContactPage = () => {
    return (
        <div className='overflow-hidden min-h-[100vh] h-full flex-1 flex flex-col'>
            <div className="flex flex-col gap-0 flex-1  h-full m-0">

                {/** Hero Section */}
                <div className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-24 pb-6 sm:pb-8 md:pb-12 lg:pb-16 bg-[#F7F5F0] overflow-hidden">
                    {/* Container for the sun graphic */}
                    <div className="absolute hidden md:flex bottom-0 right-0  transform translate-y-1/6 ">
                        <img
                            src="/contactimg.png"
                            alt="Sun rays graphic"
                            className="w-full h-full lg:max-w-[500px] object-contain"
                        />
                    </div>

                    {/* Content Container */}
                    <div className="relative  container mx-auto md:mx-0  px-4 sm:px-6 lg:px-8 z-50 md:max-w-min">
                        {/* Header Text - Responsive Typography */}
                        <h1 className="font-urbanist w-full font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight text-gray-900  tracking-normal text-nowrap text-center md:text-left">
                            Contact Us
                        </h1>
                        <p className="font-sans font-normal text-sm sm:text-base leading-6 sm:leading-7 md:leading-8 text-black text-center md:text-left ">
                            Send us your comments, and enquiries using the Kazi Feedback Module.
                        </p>
                    </div>
                </div>

                {/** Contact Form Details */}
                <div className="bg-[#FAD826] py-8 sm:py-10 md:py-12 z-40 flex-1 h-full m-0">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center z-40">
                        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl flex flex-col gap-3 sm:gap-3.5 text-start">
                            <p className="font-urbanist font-normal text-lg sm:text-xl md:text-2xl leading-6 sm:leading-7 md:leading-8 text-black">
                                Kazi Feedback Module.
                            </p>
                            <div className='flex flex-col gap-0'>
                                <p className="font-sans font-normal text-sm sm:text-base leading-6 sm:leading-7 md:leading-8 text-black">
                                    This is the chat feature on the Kazi Plan App.
                                </p>
                                <p className="font-sans font-normal text-sm sm:text-base leading-6 sm:leading-7 md:leading-8 text-black">
                                    Instead of using the Field-to-CC escalation form, you can raise issues directly here. When you send a message, a Zendesk ticket is automatically created, and a CC agent responds through Zendesk. Their reply will appear in the Kazi Plan App, allowing a chat-like conversation to flow between you and the agent.
                                </p>
                                <p className="font-sans font-normal text-sm sm:text-base leading-6 sm:leading-7 md:leading-8 text-black mt-5"> If you reply more than 60 minutes after the agent’s response, a new Zendesk ticket will be created.</p>

                            </div>

                        </div>
                    </div>
                </div>

                <div className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-24 pb-6 sm:pb-8 md:pb-12 lg:pb-16 bg-[#F7F5F0] overflow-hidden">

                    <div className="relative  container mx-auto md:mx-0  px-4 sm:px-6 lg:px-8 z-50">
                        <h1 className="font-urbanist font-bold text-lg sm:text-xl md:text-2xl leading-6 sm:leading-7 md:leading-8 text-black">
                            Contacts
                        </h1>

                        <div className='flex flex-col gap-2 min-w-[200px] max-w-[400px] mt-4'>
                            <div className='font-urbanist grid grid-cols-2'>
                                <h5 className="text-[#000000B2]">
                                    Whatsapp
                                </h5>
                                <p className=''>
                                    +254 793 927956
                                </p>
                            </div>
                            <div className='font-urbanist grid grid-cols-2'>
                                <h5 className="text-[#000000B2]">
                                    Whatsapp
                                </h5>
                                <p className='text-left max-w-max'>
                                +254 730 813100
                                </p>
                            </div>
                            <div className='font-urbanist grid grid-cols-2'>
                                <h5 className="text-[#000000B2]">
                                    Solar Inverter Number
                                </h5>
                                <p className=''>
                                    +254 709 474747
                                </p>
                            </div>
                            <div className='font-urbanist grid grid-cols-2'>
                                <h5 className="text-[#000000B2]">
                                    Toll Free Number
                                </h5>
                                <p className=''>
                                    +254 800 724878
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ContactPage