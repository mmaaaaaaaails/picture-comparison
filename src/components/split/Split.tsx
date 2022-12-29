import React, {useEffect, useRef, useState} from 'react';
import {SplitProps} from "./split.props";
import styles from './split.module.css';

const Split = ({left, right}: SplitProps) => {

    const [isDown, setIsDown] = useState<boolean>(false);
    const [lineX, setLineX] = useState<number>(0);
    const [widthLeft, setWidthLeft] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const handleMove = (e: MouseEvent | TouchEvent) => {
            setLineX(x => computeState(x, e));
            setWidthLeft(x => computeState(x, e))
        }

        if (isDown) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('touchmove', handleMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove)
        }

    },[isDown])

    useEffect(() => {

         if (!ref.current) {
            return;
        }

        const handleUp = () => {
            setIsDown(false)
        }

        setLineX(ref.current.clientWidth / 2);
        setWidthLeft(ref.current.clientWidth / 2)

        window.addEventListener('mouseup', handleUp)
        window.addEventListener('touchend', handleUp)

        return () => {
            window.removeEventListener('mouseup', handleUp)
            window.removeEventListener('touchend', handleUp)
        }

    }, [])

    const computeState = (x: number, e: MouseEvent | TouchEvent) => {

        if (!ref.current) {
            return 0;
        }

        let pos: number;

        if ('movementX' in e) {
            pos = x + e.movementX;
        } else {
            pos = e.touches[0].pageX - ref.current.offsetLeft;
        }

        if (pos >= 0 && pos <= ref.current.clientWidth) {
            return pos;
        }

        return x;
    };

    const down = () => {
        setIsDown(true)
    }

    return (
        <div
            className={styles.right}
            ref={ref}
            style={{background: `url(${right})`, backgroundSize: 'contain'}}
        >
            <div
                className={styles.left}
                style={{background: `url(${left})`,
                    clipPath: `polygon(0% 0%, ${widthLeft}px 0%, ${widthLeft}px 100%, 0% 100%)`,
                    backgroundSize: 'contain'
                }}
            />
            <div
                style={{left: lineX}}
                className={styles.line}
                onMouseDown={down}
                onTouchStart={down}
            />
        </div>
    );
};

export default Split;
