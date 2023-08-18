import Image from "next/image";

export default async function PrivacyPolicyPage() {
  //https://www.privacypolicygenerator.info/live.php?token=sYEMjskMO5WcU7QKIB4QlcT4TuFZkGOD

  return (<>
    <section className="mb-12 bg-black">
      {/* <div className="relative text-lg flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4  sm:px-6 lg:px-8 items-start justify-center pt-10 ">
        <span className="mr-2 rounded-full ">
          <div className=' flex h-10 justify-start items-start overflow-hidden gap-4 '>
            <Image src="/lib/image/b/CyanArrow_8a.svg" height={100} width={100} alt="Cyan Arrow" className=" w-10 "/>
            <h1 className="w-full text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">Privacy Policy for Cyan Arrow</h1>
          </div>
        </span>
        <p>At Cyan Arrow, accessible from www.cyanarrow.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Cyan Arrow and how we use it.</p>
        <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>
        <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Cyan Arrow. This policy is not applicable to any information collected offline or via channels other than this website.</p>

        <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">Consent</h2>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

        <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">Information we collect</h2>
        <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
        <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
        <p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>

        <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">How we use your information</h2>
        <p>We use the information we collect in various ways, including to:</p>
        <ul className=" list-disc list-inside ">
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>

        <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">Log Files</h2>
        <p>Cyan Arrow follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>
        
        <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">Advertising Partners Privacy Policies</h2>
        <p>You may consult this list to find the Privacy Policy for each of the advertising partners of Cyan Arrow.</p>
        <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Cyan Arrow, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
        <p>Note that Cyan Arrow has no access to or control over these cookies that are used by third-party advertisers.</p>

        <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">Third Party Privacy Policies</h2>
        <p>Cyan Arrow's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>
        <p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>

        <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
        <p>Under the CCPA, among other rights, California consumers have the right to:</p>
        <p>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
        <p>Request that a business delete any personal data about the consumer that a business has collected.</p>
        <p>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</p>
        <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

        <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">GDPR Data Protection Rights</h2>
        <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
        <p>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>
        <p>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>
        <p>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</p>
        <p>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
        <p>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</p>
        <p>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p>
        <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

        <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">Children's Information</h2>
        <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
        <p>Cyan Arrow does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>

        <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.</p>
 

        <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">Contact Us</h2>
        <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.</p>
      </div> */}
        <div className=" max-w-7xl text-lg mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col">
                <span className="mr-2 rounded-full ">
                    <div className=' flex h-10 justify-start items-end overflow-hidden gap-4 '>
                        <Image src="/lib/image/b/CyanArrow_8a.svg" height={100} width={100} alt="Cyan Arrow" className=" w-10 "/>
                        <h1 className=" text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 ">Privacy Policy for Cyan Arrow</h1>
                        <p>Last modified: August 15, 2023</p>
                    </div>
                </span>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">1. Introduction</h2>
                <p>Please read this Privacy Policy (“Privacy Policy”) before using our Service including the Website, Widget and API (as defined below), referred to collectively as the “Service”. This Privacy Policy governs the types of information and data we collect and how we use and share this information. Your access to and use of the Service are available for your use only on the condition that you agree to the Terms of Service available under the following address: <a href="https://www.cyanarrow.com/terms">https://www.cyanarrow.com/terms</a> (“Terms of Service”) which include the terms of the Privacy Policy set forth below. CyanArrow.com (“Company”) operates the Service.We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms of Service.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">2. Definitions</h2>
                <p><b>API</b> means Cyan Arrow application programming interface to be integrated with the User’s software.</p>
                <p><b>Cookies</b> are small files stored on your Device.</p>
                <p><b>Device</b> means a computer or a mobile device.</p>
                <p><b>Data Controller</b> means a natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.</p>
                <p><b>Data Processors</b> (or Service Providers) means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.</p>
                <p><b>Data Subject</b> is any living individual who is the subject of Personal Data.</p>
                <p><b>Personal Data</b> means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).</p>
                <p><b>Service</b> means together the Website, Widget and/or the API (depending on the scope dedicated to a given User).</p>
                <p><b>Usage Data</b> is data collected automatically either generated by the use of Service or from Service infrastructure itself (for example, the duration of a page visit).</p>
                <p><b>User</b> is the individual using our Service. User corresponds to the Data Subject, who is the subject of Personal Data.</p>
                <p><b>Website</b> means web pages located at <a href="https://www.cyanarrow.com">www.cyanarrow.com</a>.</p>
                <p><b>Widget</b> means a Cyan Arrow widget that may be implemented to the User’s website.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">3. The Data Controller</h2>
                <p>The controller of your Personal Data is: CyanArrow.com.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">4. Information Collection and Use</h2>
                <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">5. Types of Data Collected</h2>
                <p><b>Personal Data</b></p>
                <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (“Personal Data”), including:</p>
                <ul className=" list-disc list-inside ">
                    <li>Email address,</li>
                    <li>First name and Last name,</li>
                    <li>Cookies and Usage Data.</li>
                </ul>
                <p><b>Usage Data</b></p>
                <p>We may also collect information that your browser sends whenever you visit our Service or when you access Service by or through a Device (“Usage Data”). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique Device identifiers and other diagnostic data. When you access Service with a Device, this Usage Data may include information such as the type of Device you use, your Device unique ID, the IP address of your Device, your operating system, the type of Internet browser you use, unique Device identifiers and other diagnostic data.</p>
                <p><b>Tracking Cookies Data</b></p><p>We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your Device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyze our Service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service. Examples of Cookies we use:</p>
                <ul className=" list-disc list-inside ">
                    <li>Session Cookies: We use Session Cookies to operate our Service,</li>
                    <li>Preference Cookies: We use Preference Cookies to remember your preferences and various settings,</li>
                    <li>Security Cookies: We use Security Cookies for security purposes,</li>
                    <li>Advertising Cookies: Advertising Cookies are used to serve you with advertisements that may be relevant to you and your interests.</li>
                </ul>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">6. Use of Data</h2>
                <p>CyanArrow.com uses the collected Personal Data for various purposes:</p>
                <ul className=" list-disc list-inside ">
                    <li>to provide and maintain our Service; type of Personal Data: email address, first name and last name, Cookies and Usage Data; necessity for the performance of a contract to which you are a party;</li>
                    <li>to notify you about changes to our Service; type of Personal Data: email address, first name and last name, Cookies and Usage Data; necessity for the performance of a contract to which you are a party;</li>
                    <li>to allow you to participate in interactive features of our Service when you choose to do so; type of Personal Data: email address, first name and last name, Cookies and Usage Data; necessity for the performance of a contract to which you are a party;</li>
                    <li>to provide customer support; type of Personal Data: email address, first name and last name, Cookies and Usage Data; necessity for the performance of a contract to which you are a party;</li>
                    <li>to gather analysis or valuable information so that we can improve our Service; type of Personal Data: email address, first name and last name, Cookies and Usage Data; legitimate interests of the Data Controller;</li>
                    <li>to monitor the usage of our Service; type of Personal Data: email address, first name and last name, Cookies and Usage Data; legitimate interests of the Data Controller;</li>
                    <li>to detect, prevent and address technical issues; type of Personal Data: email address, first name and last name, Cookies and Usage Data; legitimate interests of the Data Controller;</li>
                    <li>to fulfill any other purpose for which you provide it; type of Personal Data: email address, first name and last name, Cookies and Usage Data; necessity for the performance of a contract to which you are a party;</li>
                    <li>to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection; type of Personal Data: email address, first name and last name, Cookies and Usage Data; necessity for the performance of a contract to which you are a party;</li>
                    <li>to provide you with notices about your account and/or subscription, including expiration and renewal notices, email-instructions, etc.; type of Personal Data: email address, first name and last name, Cookies and Usage Data; necessity for the performance of a contract to which you are a party;</li>
                    <li>to provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information; type of Personal Data: email address, first name and last name, Cookies and Usage Data; upon your consent;</li>
                    <li>in any other way we may describe when you provide the information; type of Personal Data: email address, first name and last name, Cookies and Usage Data; necessity for the performance of a contract to which you are a party;</li>
                </ul>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">7. Retention of Data</h2>
                <p>We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies. Your Personal Data processed upon your consent will be stored for as long as the relevant consent is not withdrawn and until the expiration of claims resulting from the Service. We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">8. Transfer of Data</h2>
                <p>Your information, including Personal Data, may be transferred to – and maintained on – computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there. The Company will take all the steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information. When we transfer your Personal Data to other countries, we will protect that Personal Data as described in this Privacy Policy and in accordance with applicable law. We use contractual protections for the transfer of Personal Data among various jurisdictions (the European Commission’s standard contractual clauses referred to in Article 46. 2 c) of the GDPR).</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">9. Disclosure of Data</h2>
                <p>We may disclose Personal Data you provide:</p>
                <ul className=" list-disc list-inside ">
                    <li>under certain circumstances, if required to do so by law or in response to valid requests by public authorities;</li>
                    <li>if we or our subsidiaries are involved in a merger, acquisition or asset sale;</li>
                    <li>to our subsidiaries, affiliates, employees;</li>
                    <li>to contractors, service providers, and other third parties we use to support our business;</li>
                    <li>to fulfill the purpose for which you provide it;</li>
                    <li>for the purpose of including your company’s logo on our Website;</li>
                    <li>with your consent in any other cases.</li>
                </ul>
                <p>We do not sell or otherwise share your Personal Data, except as described in this Privacy Policy.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">10. Security of Data</h2>
                <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. We use appropriate administrative, technical and physical safeguards to protect the Personal Data you provide against accidental, unlawful or unauthorized destruction, loss, alteration, access, disclosure or use, e.g. we maintain backup copies and only authorized personnel may access the Personal Data.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">11. Your Data Protection Rights Under General Data Protection Regulation (GDPR)</h2>
                <p>If you are a resident of the European Union (EU) and European Economic Area (EEA), you have certain data protection rights, covered by GDPR. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. You have the following data protection rights:</p>
                <ul className=" list-disc list-inside ">
                    <li>to access to your Personal Data by requesting sharing and/or sending a copy of all your Personal Data processed by us;</li>
                    <li>to request rectification of inaccurate Personal Data by indicating the data requiring rectification;</li>
                    <li>to request erasure of your Personal Data; we have the right to refuse to erase the Personal Data in specific circumstances provided by law;</li>
                    <li>to request restriction of processing of your Personal Data by indicating the data which should be restricted;</li>
                    <li>to object to processing your Personal Data conducted based on grounds relating to your particular situation;</li>
                    <li>to withdraw the consent to process your Personal Data at any time. Withdrawal of the consent is possible solely in the scope of processing made based on consent. We are authorized to process your Personal Data after withdrawal your consent if we have the legal basis for such processing, for the purposes defined by that legal basis;</li>
                    <li>to lodge a complaint with a supervisory authority, in particular in the EU member state of your habitual residence, place of work or place of the alleged infringement if you consider that the processing of Personal Data relating to you infringes GDPR.</li>
                </ul>
                <p>If you wish to execute any of the above-mentioned rights, please email us at support@cyanarrow.com. Please note that we may ask you to verify your identity before responding to such requests. Please note, we may not able to provide Service without some necessary data.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">12. Your Data Protection Rights under the California Privacy Protection Act (CalOPPA)</h2>
                <p>CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law’s reach stretches well beyond California to require a person or company in the United States (and conceivable the world) that operates websites collecting personally identifiable information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals with whom it is being shared, and to comply with this policy. See more at: <a href="https://consumercal.org/about-cfc/cfc-education-foundation/california-online-privacy-protection-act-caloppa-3/">https://consumercal.org/about-cfc/cfc-education-foundation/california-online-privacy-protection-act-caloppa-3/</a>.</p>
                <p>According to CalOPPA we agree to the following:</p>
                <ul className=" list-disc list-inside ">
                    <li>users can visit our site anonymously;</li>
                    <li>our Privacy Policy link includes the word “Privacy”, and can easily be found on the page specified above on the home page of our website;</li>
                    <li>users will be notified of any privacy policy changes on our Privacy Policy Page;</li>
                    <li>users are able to change their personal information by emailing us at support@cyanarrow.com.</li>
                </ul>
                <p>Our Policy on “Do Not Track” Signals:</p>
                <p>We honor Do Not Track signals and do not track, plant cookies, or use advertising when a Do Not Track browser mechanism is in place. Do Not Track is a preference you can set in your web browser to inform websites that you do not want to be tracked. You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">13. Service Providers</h2>
                <p>We may employ third party companies and individuals to facilitate our Service (“Service Providers”), provide Service on our behalf, perform Service-related services or assist us in analysing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">14. Analytics</h2>
                <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
                <p><b>Google Analytics</b>
                </p><p>Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualise and personalise the ads of its own advertising network. For more information on the privacy practices of Google, please visit the Google Privacy Terms web page: <a href="https://policies.google.com/privacy?hl=en">https://policies.google.com/privacy?hl=en</a>. We also encourage you to review the Google's policy for safeguarding your data: <a href="https://support.google.com/analytics/answer/6004245">https://support.google.com/analytics/answer/6004245</a>.</p>
                <p><b>Mixpanel</b></p>
                <p>Mixpanel is provided by Mixpanel Inc. You can prevent Mixpanel from using your information for analytics purposes by opting-out. To opt-out of Mixpanel service, please visit this page: <a href="https://mixpanel.com/optout/">https://mixpanel.com/optout/</a>. For more information on what type of information Mixpanel collects, please visit the Terms of Use page of Mixpanel: <a href="https://mixpanel.com/terms/">https://mixpanel.com/terms/</a>.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">15. Payments</h2>
                <p>We may provide paid products and/or services within Service. In that case, we use third-party services for payment processing (e.g. payment processors). We will not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information. The payment processors we work with are:</p>
                <ul className=" list-disc list-inside ">
                    <li>Stripe - Privacy Policy of Stripe Inc. can be viewed at: <a href="https://stripe.com/us/privacy">https://stripe.com/us/privacy</a>.</li>
                </ul>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">16. Links to Other Sites</h2>
                <p>Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">17. Children's Privacy</h2>
                <p>Our Service does not address anyone under the age of 16 (“Children”). We do not knowingly collect personally identifiable information from anyone under the age of 16. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">18. Changes to This Privacy Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating “effective date” at the top of this page, unless another type of notice is required by the applicable law. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. By continuing to use our Service or providing us with Personal Data after we have posted an updated Privacy Policy, or notified you if applicable, you consent to the revised Privacy Policy and practices described in it.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">19. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at support@cyanarrow.com.</p>
                <h2 className="w-full text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">20. Privacy Policy Addendum</h2>
                <p><b>Addendum to Privacy Policy for Canada</b></p>
                <p>Personal Data maintained and processed by our affiliates and third-party service providers in the U.S. and other foreign jurisdictions may be subject to disclosure pursuant to a lawful access request by U.S. or foreign courts or government authorities. We will not provide your information to third parties for marketing purposes without your prior consent. For more information about our privacy practices; to access, update or correct inaccuracies in your personal information; or if you have a question or complaint about the manner in which we or our service providers treat your personal information, please contact us on data indicated in section “Contact us” above.</p>
                <p><b>Addendum to Privacy Policy for Mexico</b></p>
                <p>To the extent Mexican privacy laws or regulations apply, the following additional Mexico-specific provisions apply and shall prevail over conflicting provisions in the Privacy Policy.</p><p>How We Use the Information We Obtain</p><p>In addition, we may use your Personal Data for the other purposes listed in the “Use of Data” section of the Privacy Policy, which may be considered secondary purposes under Mexican law. We do not use or share personal payment or financial information except in connection with the processing of payments or where there is another legal basis. You may withdraw your consent to our processing of your Personal Data by contacting us as indicated in the “Contact Us” section of the Privacy Policy. If you withdraw your consent for us to process your Personal Data for one of the primary purposes indicated above, then in some situations we may not be able to provide the service, though we may still engage in certain processing authorized by law. The Company may also use data and related data analysis in other Company products and services.</p>
                <p>Information We Share</p>
                <p>We may share your Personal Data as provided in the Privacy Policy, but to the extent permitted by law, you may withdraw your consent to this sharing by contacting us as indicated in the “Contact Us” section of the Privacy Policy. We also share the related information we obtain with our customers, partners, affiliates, and joint marketing partners. These entities, which collectively are referred to here as the “Business Partners” may use the information for the purposes described in this Privacy Policy. We may also share the information with our Business Partners and other third parties for warranty, troubleshooting or maintenance purposes, or for improving the design and performance of their products and services.</p>
                <p>Requests for Access, Correction, Cancellation, Objection or Consent Withdrawal</p>
                <p>In addition to any rights granted in the Privacy Policy, you may ask us to cancel your Personal Data to the extent permitted by law by contacting us as indicated in the “Contact Us” section of the Privacy Policy. Following a valid cancellation request, we may hold the Personal Data for the duration and purposes permitted by law before deleting it. We will answer your requests to access, correct or cancel your Personal Data or to object or withdraw your consent to our processing of your Personal Data within 20 business days from the date we receive your complete request or as provided by law. To be considered complete, your request must include your full name and contact address, and a clear and detailed description of your request.</p>
                <p><b>Addendum to Privacy Policy for Japan</b></p>
                <p>The Company complies with Japanese laws and regulations, including the Act on the Protection of Personal Information. The Company is primarily responsible for the management of the Personal Data that is jointly used with our affiliates or third parties. We will not provide your information to third parties for marketing purposes without your prior consent.</p>
                <p><b>Addendum to Privacy Policy for Republic of Korea</b></p>
                <p>Except as otherwise required by law, consumer Personal Data is securely disposed of without delay when (i) the consumer revokes his or her consent for our use of the information, (ii) the purpose of our collection and use of the Personal Data has been accomplished or (iii) the legal retention period has expired. If applicable law requires the preservation of Personal Data that otherwise would be disposed of, the Personal Data is transferred to a separate database and then disposed of after the period determined by the applicable law. Personal Data is disposed of using a method that is reasonably likely to prevent the Personal Data from being restored or reused. We will not provide your Personal Data to third parties in violation of law (such as without your consent, where consent is required). For the purposes stated in the Privacy Policy, Company or our affiliates are responsible for the handling of Personal Data with respect to services provided in Republic of Korea.</p>
            </div>
        </div>
    </section></>
    );
}
