interface Props {
    size?: number;
    className?: string;
    fillClassName?: string;
}

const Loading = ({
    size = 32,
    className,
    fillClassName = "fill-rose-500"
}: Props) => {
    return (
        <div className={className}>
            <svg
                className={fillClassName}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width={size}
                height={size}
                fill="current"
            >
                <circle transform="translate(8 0)" cx="0" cy="16" r="0">
                    <animate
                        attributeName="r"
                        values="0; 4; 0; 0"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0"
                        keyTimes="0;0.2;0.7;1"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
                        calcMode="spline"
                    />
                </circle>
                <circle transform="translate(16 0)" cx="0" cy="16" r="0">
                    <animate
                        attributeName="r"
                        values="0; 4; 0; 0"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0.3"
                        keyTimes="0;0.2;0.7;1"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
                        calcMode="spline"
                    />
                </circle>
                <circle transform="translate(24 0)" cx="0" cy="16" r="0">
                    <animate
                        attributeName="r"
                        values="0; 4; 0; 0"
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin="0.6"
                        keyTimes="0;0.2;0.7;1"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
                        calcMode="spline"
                    />
                </circle>
            </svg>
        </div>
    );
};

export default Loading;
