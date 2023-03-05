import { Link } from "react-router-dom";

function SupportPage() {
    return (
        <>
            <h2>Support</h2>
            <section>
            <p className="tagline">Call 000 in an emergency and 131 444 for police attendance.</p>
            <div className="text-block">
            <p>View the resources below for family and domestic violence information and support services.</p>
            <ul>
                <li><Link to="https://www.whiteribbon.org.au/">White Ribbon Australia</Link></li>
                <li><Link to="https://www.servicesaustralia.gov.au/family-and-domestic-violence">Services Australia</Link></li>
                <li><Link to="https://www.1800respect.org.au/">1800 RESPECT</Link></li>
                <li><Link to="https://www.lifeline.org.au/get-help/information-and-support/domestic-and-family-violence//">Lifeline</Link></li>
                <li><Link to="https://www.respect.gov.au/">Australian government Respect campaign</Link></li>
            </ul>
            </div>
            </section>
        </>
    );
}

export default SupportPage;