import { Link } from "react-router-dom";

function SupportPage() {
    return (
        <section>
            <h2>Support</h2>
            <div className="text-block">
            <p>View the resources below for family and domestic violence information and support services.</p>
            <ul>
                <li><Link to="https://www.whiteribbon.org.au/">White Ribbon Australia</Link></li>
            </ul>
            </div>
        </section>
    );
}

export default SupportPage;