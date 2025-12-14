import Button, {ButtonColor} from "@/components/button";

export default function ErrorMessage(props: { messages: string[], setShow: Function }) {

    return (
        <div className="flex flex-row justify-between bg-red-500/50 backdrop-blur-sm border-red-500 border-2 rounded-lg p-4">
            <div>
                {props.messages.map(message =>
                    <p className="text-white">{message}</p>)
                }
            </div>
            <Button color={ButtonColor.WARNING}
                    label="Close"
                    onCLick={() => props.setShow(false)}/>
        </div>
    );
}