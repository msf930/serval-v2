import Rive, { useRive } from '@rive-app/react-canvas';

export default function RiveWebBtn() {
    const { rive, RiveComponent } = useRive({
        src: '/webButton.riv',
        stateMachines: "stateMachine",
        autoplay: false,
    });

    return (
        <div
            onMouseEnter={() => rive && rive.play()}
            onMouseLeave={() => rive && rive.pause()}
            style={{ width: 200, height: 100, position: "absolute", top: 0, left: 0}}
        >
            <RiveComponent />
        </div>
    );
}