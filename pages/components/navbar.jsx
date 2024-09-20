import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 text-white flex">
            <h1 className="text-2xl font-bold mr-20" > mi tiendita </h1>
            <ul className="flex gap-4"> 
                <li> <Link href="/home"> Home </Link> </li>
                <li> <Link href="/about"> About </Link> </li>
                <li> <Link href="/contact"> Contact </Link> </li>
            </ul>
        </nav>
    )
}

export default Navbar;
