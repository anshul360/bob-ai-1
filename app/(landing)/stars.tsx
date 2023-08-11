export default function Stars() {
    return <>
        <style jsx>
        {`
            .sky {
                -webkit-transform: rotateZ(135deg);
                transform: rotateZ(135deg);
                left: 192px;
                top: -142px;
            }
            @media(min-width: 640px) {
                .sky {
                    left: 0px;
                    top: 100px;
                }
            }
            
            .star {
                position: absolute;
                left: 50%;
                top: 50%;
                height: 2px;
                border-radius: 885px;
                background: linear-gradient(-45deg,
                    #00ffff, rgba(0, 0, 255, 0));
            
                -webkit-filter: drop-shadow(0 0 6px #eef1f8);
                filter: drop-shadow(0 0 6px #d7dff0);
                -webkit-animation: tail 3000ms ease-in-out infinite,
                    shooting 3000ms ease-in-out infinite;
                animation: tail 3000ms ease-in-out infinite,
                    shooting 3000ms ease-in-out infinite;
            }
            
            .star::before,
            .star::after {
                content: "";
                position: absolute;
                top: calc(50% - 1px);
                right: 0;
                height: 2px;
                background: linear-gradient(-45deg,
                    rgba(0, 0, 255, 0),
                    #00ffff,
                    rgba(0, 0, 255, 0));
                -webkit-transform: translateX(50%) rotateZ(45deg);
                transform: translateX(50%) rotateZ(45deg);
                border-radius: 100%;
                -webkit-animation: shining 3000ms ease-in-out infinite;
                animation: shining 3000ms ease-in-out infinite;
            }
            
            .star::after {
                -webkit-transform: translateX(50%) rotateZ(-45deg);
                transform: translateX(50%) rotateZ(-45deg);
            }
            
            .star:nth-child(1) {
                top: calc(99%);
                left: calc(43px);
                -webkit-animation-delay: 4000ms;
                animation-delay: 4000ms;
            }
            
            .star:nth-child(1)::before,
            .star:nth-child(1)::after {
                -webkit-animation-delay: 4000ms;
                animation-delay: 4000ms;
            }
            
            .star:nth-child(2) {
                top: calc(43%);
                left: calc(37px);
                -webkit-animation-delay: 5000ms;
                animation-delay: 5000ms;
            }
            
            .star:nth-child(2)::before,
            .star:nth-child(2)::after {
                -webkit-animation-delay: 5000ms;
                animation-delay: 5000ms;
            }
            
            .star:nth-child(3) {
                top: calc(80%);
                left: calc(222px);
                -webkit-animation-delay: 7000ms;
                animation-delay: 7000ms;
            }
            
            .star:nth-child(3)::before,
            .star:nth-child(3)::after {
                -webkit-animation-delay: 7000ms;
                animation-delay: 7000ms;
            }
            
            .star:nth-child(4) {
                top: calc(29%);
                left: calc(113px);
                -webkit-animation-delay: 7000ms;
                animation-delay: 7000ms;
            }
            
            .star:nth-child(4)::before,
            .star:nth-child(4)::after {
                -webkit-animation-delay: 7000ms;
                animation-delay: 7000ms;
            }
            
            .star:nth-child(5) {
                top: calc(66%);
                left: calc(112px);
                -webkit-animation-delay: 3000ms;
                animation-delay: 3000ms;
            }
            
            .star:nth-child(5)::before,
            .star:nth-child(5)::after {
                -webkit-animation-delay: 3000ms;
                animation-delay: 3000ms;
            }
            
            .star:nth-child(6) {
                top: calc(08%);
                left: calc(160px);
                -webkit-animation-delay: 3000ms;
                animation-delay: 3000ms;
            }
            
            .star:nth-child(6)::before,
            .star:nth-child(6)::after {
                -webkit-animation-delay: 3000ms;
                animation-delay: 3000ms;
            }
            
            .star:nth-child(7) {
                top: calc(52%);
                left: calc(72px);
                -webkit-animation-delay: 7000ms;
                animation-delay: 7000ms;
            }
            
            .star:nth-child(7)::before,
            .star:nth-child(7)::after {
                -webkit-animation-delay: 7000ms;
                animation-delay: 7000ms;
            }
            
            .star:nth-child(8) {
                top: calc(9%);
                left: calc(43px);
                -webkit-animation-delay: 4500ms;
                animation-delay: 4000ms;
            }
            
            .star:nth-child(8)::before,
            .star:nth-child(8)::after {
                -webkit-animation-delay: 4500ms;
                animation-delay: 4000ms;
            }
            
            .star:nth-child(9) {
                top: calc(3%);
                left: calc(37px);
                -webkit-animation-delay: 5500ms;
                animation-delay: 5000ms;
            }
            
            .star:nth-child(9)::before,
            .star:nth-child(9)::after {
                -webkit-animation-delay: 5500ms;
                animation-delay: 5000ms;
            }
            
            .star:nth-child(10) {
                top: calc(0%);
                left: calc(222px);
                -webkit-animation-delay: 7500ms;
                animation-delay: 7000ms;
            }
            
            .star:nth-child(10)::before,
            .star:nth-child(10)::after {
                -webkit-animation-delay: 7500ms;
                animation-delay: 7000ms;
            }
            
            .star:nth-child(11) {
                top: calc(39%);
                left: calc(113px);
                -webkit-animation-delay: 9500ms;
                animation-delay: 7000ms;
            }
            
            .star:nth-child(11)::before,
            .star:nth-child(11)::after {
                -webkit-animation-delay: 9500ms;
                animation-delay: 7000ms;
            }
            
            .star:nth-child(12) {
                top: calc(86%);
                left: calc(112px);
                -webkit-animation-delay: 3500ms;
                animation-delay: 3000ms;
            }
            
            .star:nth-child(12)::before,
            .star:nth-child(12)::after {
                -webkit-animation-delay: 3500ms;
                animation-delay: 3000ms;
            }
            
            .star:nth-child(13) {
                top: calc(58%);
                left: calc(160px);
                -webkit-animation-delay: 3500ms;
                animation-delay: 3000ms;
            }
            
            .star:nth-child(13)::before,
            .star:nth-child(13)::after {
                -webkit-animation-delay: 3500ms;
                animation-delay: 3000ms;
            }
            
            .star:nth-child(14) {
                top: calc(72%);
                left: calc(72px);
                -webkit-animation-delay: 8500ms;
                animation-delay: 7000ms;
            }
            
            .star:nth-child(14)::before,
            .star:nth-child(14)::after {
                -webkit-animation-delay: 8500ms;
                animation-delay: 7000ms;
            }
            
            @keyframes tail {
                0% {
                    width: 0;
                }
            
                30% {
                    width: 100px;
                }
            
                100% {
                    width: 0;
                }
            }
            
            @keyframes shining {
                0% {
                    width: 0;
                }
            
                50% {
                    width: 30px;
                }
            
                100% {
                    width: 0;
                }
            }
            
            @-webkit-keyframes shining {
                0% {
                    width: 0;
                }
            
                50% {
                    width: 30px;
                }
            
                100% {
                    width: 0;
                }
            }
            
            @-webkit-keyframes tail {
                0% {
                    width: 0;
                }
            
                30% {
                    width: 100px;
                }
            
                100% {
                    width: 0;
                }
            }
            
            @-webkit-keyframes shooting {
                0% {
                    -webkit-transform: translateX(0);
                    transform: translateX(0);
                }
            
                100% {
                    -webkit-transform: translateX(70vw);
                    transform: translateX(70vw);
                }
            }
            
            @keyframes shooting {
                0% {
                    -webkit-transform: translateX(0);
                    transform: translateX(0);
                }
            
                100% {
                    -webkit-transform: translateX(70vw);
                    transform: translateX(70vw);
                }
            }
        `}
        </style> 
        <div className="sky absolute w-full h-full ">
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
        </div>
    </>;
}