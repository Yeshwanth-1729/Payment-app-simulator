import { Link } from "react-router-dom";
export function BottomWarning({label,linkText,to}){
    return <>
        <div className="flex justify-center">
            <div className="text-sm text-gray-500">{label}</div>
            <Link className="pointer underline text-sm" to={to}>
                {linkText}
            </Link>
        </div>
    </>
}