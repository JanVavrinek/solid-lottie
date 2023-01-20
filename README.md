<p align="center">
<img src="https://assets.solidjs.com/banner?project=Lottie" height="150">
</p>

<h1 align="center">
Solid Lottie
</h1>

Solid wrapper of [lottie-web](https://github.com/airbnb/lottie-web).

## Installation

Install using **yarn**

```
yarn add solid-lottie
```

Install using **pnpm**

```
pnpm install solid-lottie
```

Install using **npm**

```
npm install solid-lottie
```

## Usage

```js
import Lottie, { LottieRef } from 'solid-lottie';

const App: VoidComponent = () => {
  let lottieRef: LottieRef | undefined;

  const handleDataReady = () => {
    if (!lottieRef) return;

    lottieRef.play();
  };

  return (
    <>
      <Lottie path="/animation.json" loop ref={(v) => (ref = v)} onDataReady={() => handleDataReady()} />
    </>
  );
};
```

## Documentation

You can read the [lottie-web](https://github.com/airbnb/lottie-web) documentation to get more info about lottie.

**More detailed documentation can be found [here](https://github.com/JanVavrinek/solid-lottie/wiki)**

---

### Note about this project

It was done very quickly one evening before I needed it for another project and I figured I could share it with the rest of the world.

If you find any bugs or something screams that I don't know what I'm doing, tell me! I'll be more than happy to fix any issues and learn new things along the way.
