A webGL implementation of a cyclical cellular automaton.

[Demo](https://bewelge.github.io/CCA-WebGL/)

![preview](https://github.com/Bewelge/CCA-WebGL/blob/master/src/images/preview.png)

Each pixel holds four seperate states, stored in its r,g,b,a values. These states have different ranges within which they cycle. The implementation allows creating rulesets that support both independent and dependent behaviour between the different states. In other words: It's possible to run 4 completely seperate automatons that run simulatenously but allows to arbitrarily create dependencies between them.

Build with

```
npx webpack
```
