# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Driver Portal

The React driver portal is available at `/driver`. It connects to the Google Apps Script web app and uses a driver's Application ID and registered phone number to identify an approved driver.

Before publishing: update the Apps Script project with `AssuranceRide_DriverPortal_Code.gs`, deploy the public API version, confirm the script URL in `src/pages/DriverPortal.jsx`, and test using an approved driver and test booking. Keep the owner's separate dashboard deployment private.

Security note: Application ID plus phone is basic pilot authentication, not strong production authentication. Before broad production use, add OTP verification or a driver-set PIN with rate limiting.
