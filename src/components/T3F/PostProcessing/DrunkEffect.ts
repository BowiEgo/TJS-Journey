import { BlendFunction, Effect } from 'postprocessing';
import {
    Color,
    ColorRepresentation,
    Texture,
    Uniform,
    Vector3,
    WebGLRenderTarget,
    WebGLRenderer,
} from 'three';
import { DrunkProps } from './Drunk';

const fragmentShader = /* glsl */ `
    uniform float frequency;
    uniform float amplitude;
    uniform vec3 color;
    uniform float offset;

    void mainUv(inout vec2 uv)
    {
        uv.y += sin(uv.x * frequency + offset) * amplitude;
    }

    // const: the parameter is not writable
    // in: it's a copy of the actual variable and changing it won't affect the initial variable sent when callig the function
    // out: changing this value will change the variable sent when callig the function 
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    {
        outputColor = vec4(color.rgb, inputColor.a);
    }
`;

const generateColor = (color: Color | ColorRepresentation): Color => {
    return color instanceof Color ? color : new Color(color);
};

export default class DrunkEffect extends Effect {
    speed: number;

    constructor({
        frequency = 10,
        amplitude = 0.1,
        speed = 1,
        color = new Color(0.8, 1, 0.5),
        blendFunction = BlendFunction.DARKEN,
    }: DrunkProps) {
        super('DrunkEffect', fragmentShader, {
            blendFunction: blendFunction,
            uniforms: new Map([
                ['frequency', new Uniform(frequency)],
                ['amplitude', new Uniform(amplitude)],
                [
                    'color',
                    new Uniform(new Vector3(...generateColor(color).toArray())) as Uniform<any>,
                ],
                ['offset', new Uniform(0)],
            ]),
        });

        this.speed = speed;
    }

    update = function (
        _renderer: WebGLRenderer,
        _inputBuffer: WebGLRenderTarget<Texture>,
        deltaTime: number | undefined,
    ): void {
        this.uniforms.get('offset').value += (deltaTime || 0) * this.speed;
    };
}
