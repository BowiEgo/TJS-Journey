import {
    DotScreenPass,
    GammaCorrectionShader,
    GlitchPass,
    RGBShiftShader,
    RenderPass,
    ShaderPass,
    UnrealBloomPass,
} from 'three/examples/jsm/Addons.js'
import { Core, createCore } from '../../core'
import Effect from '../../core/Effect'
import { Scene, Vector2, Vector3 } from 'three'
import Debug from '../../core/Debug'
import GUI from 'lil-gui'
import Time from '../../core/Time'
import Resources from '../../core/Resources'

export default class EffectPass {
    core: Core
    scene: Scene
    time: Time
    resources: Resources
    debug: Debug
    debugFolder: GUI | undefined
    effect: Effect
    effects: any = {}

    constructor() {
        this.core = createCore()
        this.scene = this.core.scene
        this.effect = this.core.effect
        this.time = this.core.time
        this.resources = this.core.resources
        this.debug = this.core.debug

        // Setup
        this.effects = this.setEffects()
    }

    setEffects() {
        const renderPass = new RenderPass(this.scene, this.core.camera.instance)
        this.effect.instance.addPass(renderPass)

        const dotScreenPass = new DotScreenPass()
        dotScreenPass.enabled = false
        this.effect.instance.addPass(dotScreenPass)

        const glitchPass = new GlitchPass()
        glitchPass.goWild = false
        // glitchPass.enabled = false
        this.effect.instance.addPass(glitchPass)

        const rgbShiftPass = new ShaderPass(RGBShiftShader)
        rgbShiftPass.enabled = false
        this.effect.instance.addPass(rgbShiftPass)

        const gammaCorrectPass = new ShaderPass(GammaCorrectionShader)
        this.effect.instance.addPass(gammaCorrectPass)

        const unrealBloomPass = new UnrealBloomPass(
            new Vector2(window.innerWidth, window.innerHeight),
            0.1,
            0.5,
            0.6,
        )
        this.effect.instance.addPass(unrealBloomPass)

        const tintShader = {
            uniforms: {
                tDiffuse: { value: null },
                uTint: { value: null },
            },
            vertexShader: `
                varying vec2 vUv;

                void main()
                {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

                    vUv = uv;
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform vec3 uTint;

                varying vec2 vUv;

                void main()
                {
                    vec4 color = texture2D(tDiffuse, vUv);
                    color.rgb += uTint;

                    gl_FragColor = color;
                }
            `,
        }
        const tintPass = new ShaderPass(tintShader)
        tintPass.material.uniforms.uTint.value = new Vector3()
        this.effect.instance.addPass(tintPass)

        const displacementShader = {
            uniforms: {
                tDiffuse: { value: null },
                uTime: { value: null },
                uNormalMap: { value: null },
            },
            vertexShader: `
                varying vec2 vUv;

                void main()
                {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

                    vUv = uv;
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform float uTime;
                uniform sampler2D uNormalMap;

                varying vec2 vUv;

                void main()
                {
                    // vec2 newUv = vec2(
                    //     vUv.x,
                    //     vUv.y + sin(vUv.x * 10.0 + uTime) * 0.1
                    // );
                    vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;

                    vec2 newUv = vUv + normalColor.xy * 0.1;
                    vec4 color = texture2D(tDiffuse, newUv);

                    vec3 lightDirection = normalize(vec3(- 1.0, 1.0, 0.0));
                    float lightness = clamp(dot(normalColor, lightDirection), 0.0, 1.0);
                    color.rgb += lightness * 2.0;

                    gl_FragColor = color;
                }
            `,
        }
        const displacementPass = new ShaderPass(displacementShader)
        displacementPass.material.uniforms.uTime.value = 0
        displacementPass.material.uniforms.uNormalMap.value =
            this.resources.items.interfaceNormalTexture
        this.effect.instance.addPass(displacementPass)

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui?.addFolder('DotScreenPass')
            this.debugFolder?.add(dotScreenPass, 'enabled')

            this.debugFolder = this.debug.ui?.addFolder('GlitchPass')
            this.debugFolder?.add(glitchPass, 'enabled')

            this.debugFolder = this.debug.ui?.addFolder('RgbShiftPass')
            this.debugFolder?.add(rgbShiftPass, 'enabled')

            this.debugFolder = this.debug.ui?.addFolder('GammaCorrectPass')
            this.debugFolder?.add(gammaCorrectPass, 'enabled')

            this.debugFolder = this.debug.ui?.addFolder('UnrealBloomPass')
            this.debugFolder?.add(unrealBloomPass, 'enabled')

            this.debugFolder?.add(unrealBloomPass, 'enabled')
            this.debugFolder?.add(unrealBloomPass, 'strength').min(0).max(2).step(0.001)
            this.debugFolder?.add(unrealBloomPass, 'radius').min(0).max(2).step(0.001)
            this.debugFolder?.add(unrealBloomPass, 'threshold').min(0).max(1).step(0.001)

            this.debugFolder = this.debug.ui?.addFolder('TintPass')
            this.debugFolder?.add(tintPass, 'enabled')
            this.debugFolder
                ?.add(tintPass.material.uniforms.uTint.value, 'x')
                .min(-1)
                .max(1)
                .step(0.001)
                .name('red')
            this.debugFolder
                ?.add(tintPass.material.uniforms.uTint.value, 'y')
                .min(-1)
                .max(1)
                .step(0.001)
                .name('green')
            this.debugFolder
                ?.add(tintPass.material.uniforms.uTint.value, 'z')
                .min(-1)
                .max(1)
                .step(0.001)
                .name('blue')

            this.debugFolder = this.debug.ui?.addFolder('DisplacementPass')
            this.debugFolder?.add(displacementPass, 'enabled')
        }

        const effects = {
            renderPass,
            dotScreenPass,
            glitchPass,
            rgbShiftPass,
            gammaCorrectPass,
            unrealBloomPass,
            tintPass,
            displacementPass,
        }
        this.effects = effects

        return effects
    }

    update() {
        this.effects.displacementPass.material.uniforms.uTime.value = this.time.elapsed
    }

    destroy() {
        for (let i in this.effects) {
            this.effect.instance.removePass(this.effects[i])
            this.effects[i].dispose()
        }
    }
}
