import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
const canvasSketch = require('canvas-sketch');
const {lerp, sign} = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

interface ICanvasSketchProps {
    dimensions: number[],
    colors?: string[],
    background?: string
}

const CanvasSketch: FC<ICanvasSketchProps> = ({dimensions, ...props}) => {
    let canvasRef = useRef(null);
    const [sketchLoaded, setSketchLoaded] = useState(true);

    random.setSeed(random.getRandomSeed());
    // random.setSeed(random.getRandomSeed());
    console.log(random.getSeed());

    const settings = {
    dimensions: dimensions,
    suffix: random.getSeed(),
    canvas: canvasRef.current
    // pixelsPerInch: 300
    };

    const sketch = (): Function => {
        random.setSeed(random.getRandomSeed());
    // random.setSeed(random.getRandomSeed());
        console.log(random.getSeed());

        console.log('canvas');
        const createGrid = () => {
            const points = [];
            const count = 43;
            let colorCount, palette;
            if (props.colors) {
                colorCount = props.colors.length;
                palette = props.colors
            } else {
                colorCount = random.rangeFloor(2, 6);
                palette = random.shuffle(random.pick(palettes).slice(0, colorCount));
            }
            console.log(palette);
            // console.log(Math.floor(Math.random()*5), (palette));
            for (let x = 0; x < count; x++) {
            for (let y = 0; y < count; y++) {
                const u = x / (count - 1);
                const v = y / (count - 1);
                const radius = Math.abs(random.noise2D(u/0.2, v/0.2)*random.noise2D(u*Math.PI, v*Math.PI)/Math.tan(v*u/Math.PI))/(random.noise2D(u, v)*224);
                // const radius = Math.abs(random.noise2D(u/0.4, v/0.3)*random.noise2D(u, v)/Math.sin(v*u/Math.PI));
                points.push({
                radius,
                rotation: random.noise2D(u, v)/Math.sin(u*333), 
                position: [u, v],
                count: count,
                color: random.pick(palette)
                });
            }
            }
            return points
        }
        const points = createGrid().filter(() => random.value() > 0.5);
        const margin = 300;

    
        return ({ context, width, height}: {context: any, width: number, height: number}): void => {
            context.fillStyle = props.background ? props.background : 'white';
            context.fillRect(0, 0, width, height);
            
            points.forEach((data) => {
            const {position, radius, count, color, rotation} = data;
            const [u, v] = position;
            const x = lerp(margin, width-margin, u);
            const y = lerp(margin, height-margin, v);

            // const r = random.value() * 225 / Math.random();
            // const g = random.value() * 225 / Math.random();
            // const b = random.value() * 225 / Math.random();
            // const pickColor = Math.floor(Math.random()*5);
            
            
            context.save();
            
            if (Math.sin(x)<Math.sin(y) || y<=x) {
                context.beginPath(x+radius*random.noise2D(x, y), y);
                context.moveTo(x*lerp(x, width), y-height/lerp(y, height));
                context.lineTo(y*Math.sin(y/x)-radius+random.noise2D(x, y), x/Math.cos(y/x)/radius-random.noise2D(x, y));
                context.lineTo(x*radius+random.noise2D(x, y), x*radius/Math.sin(x));
                // context.lineTo(x/-radius+random.noise2D(x, y), y*radius);
                // context.lineTo(x/Math.cos(radius), y/Math.sinh(x));
                context.rotate(random.noise2D(0, 360))
                context.closePath();
                // context.scale(radius, radius);
                // context.rotate(radius/radius);
                context.strokeStyle = color;
                context.strokeWidth = radius;
                context.stroke();
            }
            context.restore();
            context.save();
            context.fillStyle = color;
            context.font = `${radius*width/count*Math.PI+4*13.1333/3-radius/x}px "Rawson Pro"`;
            context.translate(x/2-(Math.PI*0.33), y);
            context.rotate(rotation*Math.tan((x/y))*Math.PI);
            context.fillText('_', 0, 0);
            
            context.fillStyle = color;
            context.font = `${radius*width/count*Math.PI+4*13.1333/3}px "Rawson Pro"`;
            context.translate(x/2-(Math.PI*0.33), y);
            context.rotate(rotation*Math.sin(Math.cos((x/y)))*360);
            context.fillText('<', 0, 0);
            
            context.fillStyle = color;
            context.font = `${radius*width/count*Math.PI+4*13.1333/3*((x/height*y)/(y*width))}px "Rawson Pro"`;
            context.translate(x/2-(Math.PI*0.33), y);
            context.rotate(rotation*Math.sin(Math.sin((x/y)))*360);
            context.fillText(',', 0, 0);

            context.fillStyle = color;
            context.font = `${((x/height*radius)-(y/width/Math.PI)+random.noise3D(y, x, x/y)*22)}px "Rawson Alt"`;
            context.translate(x/2-(Math.PI*0.33), y);
            context.rotate(rotation*Math.sin(Math.sin((x/y)))*360);
            context.fillText('Nike', 0, 0);
            

            context.translate(x/2-(Math.PI*0.33), y);
            context.rotate(rotation*Math.sin(Math.sin((x/y)))*360);
            context.fillText('-', 0, 0);

            context.restore();
            })
        };
    };

    useMemo(() => {
        console.log(canvasRef);
        if(canvasRef.current) {
            canvasSketch(sketch, settings);
        }
    }, [sketchLoaded])

    return (
        <div>
            <button onClick={() => setSketchLoaded(!sketchLoaded)}>Reset</button>
            <div style={{
                width: dimensions[0]+25+'px',
                height: dimensions[1]+25+'px',
                border: '1px solid',
                padding: '1.3rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}
            >
                <canvas id="canvas-sketch" ref={canvasRef}></canvas>
            </div>
        </div>
    )
}

export default CanvasSketch;

