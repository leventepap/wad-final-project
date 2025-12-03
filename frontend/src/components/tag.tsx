type TagProps = {
    title: string;
    color: string;
};

export default function Tag({title, color}: TagProps) {

    const twColor = () => {
        switch (color) {
            case "red": return "bg-red-500";
            case "green": return "bg-green-500";
            case "blue": return "bg-blue-500";
            case "yellow": return "bg-yellow-500";
            case "purple": return "bg-purple-500";
            default: return "bg-gray-500";
        }
    }

    return(
        <p className={`${twColor()} uppercase rounded-sm text-white text-center font-black`}>{title}</p>
    );
}