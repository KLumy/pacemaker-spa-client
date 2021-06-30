# PACEMAKER WEBCLIENT PROJECT

이 레파지토리는 PACEMAKE의 웹 클라이언트를 포함합니다.<br />
PACEMAKER가 무엇인지에 대해서는 '다음'을 참고하세요.

## 다이어그램

![UseCase_v2](https://user-images.githubusercontent.com/30566564/123925630-1096c380-d9c6-11eb-918c-68090fd13b8f.jpg)

![DomainModel](https://user-images.githubusercontent.com/30566564/123924724-340d3e80-d9c5-11eb-96c6-26f298987bcf.jpg)

![pacemaker_component_tree](https://user-images.githubusercontent.com/30566564/123924707-31124e00-d9c5-11eb-979b-3b8aa36d858f.jpg)

![redux_store_diagram](https://user-images.githubusercontent.com/30566564/123924791-438c8780-d9c5-11eb-8e5f-739bb0125ead.jpg)

![DeploymentDiagram](https://user-images.githubusercontent.com/30566564/123925621-0ecd0000-d9c6-11eb-827c-6f8e69fed502.jpg)

## 기반

이 프로젝트는 CRA를 기반으로 하고있습니다.<br />
추가적으로 사용된 의존성 패키지는 package.json에 수록되어 있습니다.

## 사용하시기 전에

이 레파지토리를 새로 복제하신 분은 'yarn install'을 통해 의존성 설치를 하신 후,<br />
먼저 'yarn start'로 정상 작동을 확인하시고 작업하시기 바랍니다.

## Branch에 대해

이 레파지토리의 barnch는 크게 main-line, dev, release로 구분됩니다.

- release 브랜치는 최종 배포판에 대한 것으로 가장 버전이 낮습니다. 가장 안정화된 버전이 올라갑니다.
- main-line 브랜치는 dev 브랜치의 안정화된 버전이 기록됩니다. main-line에서 테스트를 거친 버전이 release 브랜치에 수록됩니다.
- dev 브렌치는 실제로 개발 작업이 일어나는 브렌치입니다. 모든 개발용 브렌치는 dev 브랜치에서 뻗어나와야 합니다.

그 이외의 브렌치는 모두 dev 브랜치를 기반으로 하는 개발용 브렌치이며 언제든 삭제되거나 병합될 수 있습니다.


## !!주의!!

현재 이 프로젝트는 1920x960(FHD에서 전체화면을 하지 않은 브라우저의 View)에 최적화되어 있습니다.<br />
이외의 해상도에서는 정상 작동을 보장할 수 없습니다!<br />
테스트시에는 1920x1080 통상화면이나 1920x1000의 전체화면을 설정하시기 바랍니다.

## CRA README Default

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
