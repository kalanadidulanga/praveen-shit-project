/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/validate-session/route";
exports.ids = ["app/api/auth/validate-session/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.js":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.js\");\n\n\n\n // Use the MongoDB connection directly\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: 'Credentials',\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\",\n                    placeholder: \"email@example.com\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                try {\n                    if (!credentials?.email || !credentials?.password) {\n                        throw new Error('Email and password are required');\n                    }\n                    // Use the MongoDB connection directly\n                    const db = await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_3__.getDb)();\n                    const usersCollection = db.collection('User');\n                    // Find the user\n                    const user = await usersCollection.findOne({\n                        email: credentials.email\n                    });\n                    if (!user) {\n                        console.log(`No user found with email: ${credentials.email}`);\n                        return null;\n                    }\n                    const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].compare(credentials.password, user.password);\n                    if (!isPasswordValid) {\n                        console.log('Invalid password');\n                        return null;\n                    }\n                    console.log('User authenticated successfully:', user.email);\n                    return {\n                        id: user._id.toString(),\n                        email: user.email,\n                        name: user.name,\n                        userType: user.userType,\n                        image: user.profileImage\n                    };\n                } catch (error) {\n                    console.error(\"Authorization error:\", error);\n                    return null;\n                }\n            }\n        })\n    ],\n    pages: {\n        signIn: '/login',\n        signOut: '/',\n        error: '/login'\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.userType = user.userType;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token && session.user) {\n                session.user.id = token.id;\n                session.user.userType = token.userType;\n            }\n            return session;\n        }\n    },\n    session: {\n        strategy: 'jwt',\n        maxAge: 30 * 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET,\n    debug: true\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFpQztBQUNpQztBQUNwQztBQUNRLENBQUMsc0NBQXNDO0FBRXRFLE1BQU1JLGNBQWM7SUFDekJDLFdBQVc7UUFDVEosMkVBQW1CQSxDQUFDO1lBQ2xCSyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07b0JBQVNDLGFBQWE7Z0JBQW9CO2dCQUN6RUMsVUFBVTtvQkFBRUgsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1HLFdBQVVOLFdBQVc7Z0JBQ3pCLElBQUk7b0JBQ0YsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFLLFVBQVU7d0JBQ2pELE1BQU0sSUFBSUUsTUFBTTtvQkFDbEI7b0JBRUEsc0NBQXNDO29CQUN0QyxNQUFNQyxLQUFLLE1BQU1aLG1EQUFLQTtvQkFDdEIsTUFBTWEsa0JBQWtCRCxHQUFHRSxVQUFVLENBQUM7b0JBRXRDLGdCQUFnQjtvQkFDaEIsTUFBTUMsT0FBTyxNQUFNRixnQkFBZ0JHLE9BQU8sQ0FBQzt3QkFBRVgsT0FBT0QsWUFBWUMsS0FBSztvQkFBQztvQkFFdEUsSUFBSSxDQUFDVSxNQUFNO3dCQUNURSxRQUFRQyxHQUFHLENBQUMsQ0FBQywwQkFBMEIsRUFBRWQsWUFBWUMsS0FBSyxFQUFFO3dCQUM1RCxPQUFPO29CQUNUO29CQUVBLE1BQU1jLGtCQUFrQixNQUFNcEIsd0RBQWMsQ0FBQ0ssWUFBWUssUUFBUSxFQUFFTSxLQUFLTixRQUFRO29CQUVoRixJQUFJLENBQUNVLGlCQUFpQjt3QkFDcEJGLFFBQVFDLEdBQUcsQ0FBQzt3QkFDWixPQUFPO29CQUNUO29CQUVBRCxRQUFRQyxHQUFHLENBQUMsb0NBQW9DSCxLQUFLVixLQUFLO29CQUMxRCxPQUFPO3dCQUNMZ0IsSUFBSU4sS0FBS08sR0FBRyxDQUFDQyxRQUFRO3dCQUNyQmxCLE9BQU9VLEtBQUtWLEtBQUs7d0JBQ2pCRixNQUFNWSxLQUFLWixJQUFJO3dCQUNmcUIsVUFBVVQsS0FBS1MsUUFBUTt3QkFDdkJDLE9BQU9WLEtBQUtXLFlBQVk7b0JBQzFCO2dCQUNGLEVBQUUsT0FBT0MsT0FBTztvQkFDZFYsUUFBUVUsS0FBSyxDQUFDLHdCQUF3QkE7b0JBQ3RDLE9BQU87Z0JBQ1Q7WUFDRjtRQUNGO0tBQ0Q7SUFDREMsT0FBTztRQUNMQyxRQUFRO1FBQ1JDLFNBQVM7UUFDVEgsT0FBTztJQUNUO0lBQ0FJLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRWxCLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSa0IsTUFBTVosRUFBRSxHQUFHTixLQUFLTSxFQUFFO2dCQUNsQlksTUFBTVQsUUFBUSxHQUFHVCxLQUFLUyxRQUFRO1lBQ2hDO1lBQ0EsT0FBT1M7UUFDVDtRQUNBLE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFRCxLQUFLLEVBQUU7WUFDOUIsSUFBSUEsU0FBU0MsUUFBUW5CLElBQUksRUFBRTtnQkFDekJtQixRQUFRbkIsSUFBSSxDQUFDTSxFQUFFLEdBQUdZLE1BQU1aLEVBQUU7Z0JBQzFCYSxRQUFRbkIsSUFBSSxDQUFDUyxRQUFRLEdBQUdTLE1BQU1ULFFBQVE7WUFDeEM7WUFDQSxPQUFPVTtRQUNUO0lBQ0Y7SUFDQUEsU0FBUztRQUNQQyxVQUFVO1FBQ1ZDLFFBQVEsS0FBSyxLQUFLLEtBQUs7SUFDekI7SUFDQUMsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxlQUFlO0lBQ25DQyxPQUFPO0FBQ1QsRUFBRTtBQUVGLE1BQU1DLFVBQVU3QyxnREFBUUEsQ0FBQ0k7QUFFa0IiLCJzb3VyY2VzIjpbIkQ6XFxLYXlEXFxwbGFzdGljLXdhc3RlLXdlYmFwcC1uZXh0anNcXGFwcFxcYXBpXFxhdXRoXFxbLi4ubmV4dGF1dGhdXFxyb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJztcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHMnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgeyBnZXREYiB9IGZyb20gJ0AvbGliL21vbmdvZGInOyAvLyBVc2UgdGhlIE1vbmdvREIgY29ubmVjdGlvbiBkaXJlY3RseVxuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnMgPSB7XG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogJ0NyZWRlbnRpYWxzJyxcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiwgcGxhY2Vob2xkZXI6IFwiZW1haWxAZXhhbXBsZS5jb21cIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfVxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRW1haWwgYW5kIHBhc3N3b3JkIGFyZSByZXF1aXJlZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFVzZSB0aGUgTW9uZ29EQiBjb25uZWN0aW9uIGRpcmVjdGx5XG4gICAgICAgICAgY29uc3QgZGIgPSBhd2FpdCBnZXREYigpO1xuICAgICAgICAgIGNvbnN0IHVzZXJzQ29sbGVjdGlvbiA9IGRiLmNvbGxlY3Rpb24oJ1VzZXInKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBGaW5kIHRoZSB1c2VyXG4gICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHVzZXJzQ29sbGVjdGlvbi5maW5kT25lKHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0pO1xuXG4gICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgTm8gdXNlciBmb3VuZCB3aXRoIGVtYWlsOiAke2NyZWRlbnRpYWxzLmVtYWlsfWApO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuXG4gICAgICAgICAgaWYgKCFpc1Bhc3N3b3JkVmFsaWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zb2xlLmxvZygnVXNlciBhdXRoZW50aWNhdGVkIHN1Y2Nlc3NmdWxseTonLCB1c2VyLmVtYWlsKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHVzZXIuX2lkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgIHVzZXJUeXBlOiB1c2VyLnVzZXJUeXBlLFxuICAgICAgICAgICAgaW1hZ2U6IHVzZXIucHJvZmlsZUltYWdlLFxuICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkF1dGhvcml6YXRpb24gZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnL2xvZ2luJyxcbiAgICBzaWduT3V0OiAnLycsXG4gICAgZXJyb3I6ICcvbG9naW4nLFxuICB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XG4gICAgICAgIHRva2VuLnVzZXJUeXBlID0gdXNlci51c2VyVHlwZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAodG9rZW4gJiYgc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkO1xuICAgICAgICBzZXNzaW9uLnVzZXIudXNlclR5cGUgPSB0b2tlbi51c2VyVHlwZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgIH1cbiAgfSxcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiAnand0JyxcbiAgICBtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkYXlzXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxuICBkZWJ1ZzogdHJ1ZSwgLy8gRW5hYmxlIGRlYnVnIG1vZGUgZm9yIHRyb3VibGVzaG9vdGluZ1xufTtcblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKTtcblxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9OyAiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiYmNyeXB0IiwiZ2V0RGIiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsIkVycm9yIiwiZGIiLCJ1c2Vyc0NvbGxlY3Rpb24iLCJjb2xsZWN0aW9uIiwidXNlciIsImZpbmRPbmUiLCJjb25zb2xlIiwibG9nIiwiaXNQYXNzd29yZFZhbGlkIiwiY29tcGFyZSIsImlkIiwiX2lkIiwidG9TdHJpbmciLCJ1c2VyVHlwZSIsImltYWdlIiwicHJvZmlsZUltYWdlIiwiZXJyb3IiLCJwYWdlcyIsInNpZ25JbiIsInNpZ25PdXQiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInNlc3Npb24iLCJzdHJhdGVneSIsIm1heEFnZSIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJkZWJ1ZyIsImhhbmRsZXIiLCJHRVQiLCJQT1NUIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.js\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/validate-session/route.js":
/*!************************************************!*\
  !*** ./app/api/auth/validate-session/route.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var _app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/api/auth/[...nextauth]/route */ \"(rsc)/./app/api/auth/[...nextauth]/route.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.js\");\n\n\n\n\nasync function GET() {\n    try {\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                valid: false\n            });\n        }\n        // Check if user still exists\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].user.findUnique({\n            where: {\n                id: session.user.id\n            },\n            select: {\n                id: true\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            valid: !!user\n        });\n    } catch (error) {\n        console.error('Session validation error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            valid: false\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvdmFsaWRhdGUtc2Vzc2lvbi9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEyQztBQUNPO0FBQ2U7QUFDL0I7QUFFM0IsZUFBZUk7SUFDcEIsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTUosZ0VBQWdCQSxDQUFDQyxxRUFBV0E7UUFFbEQsSUFBSSxDQUFDRyxTQUFTO1lBQ1osT0FBT0wscURBQVlBLENBQUNNLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFNO1FBQzFDO1FBRUEsNkJBQTZCO1FBQzdCLE1BQU1DLE9BQU8sTUFBTUwsbURBQU1BLENBQUNLLElBQUksQ0FBQ0MsVUFBVSxDQUFDO1lBQ3hDQyxPQUFPO2dCQUNMQyxJQUFJTixRQUFRRyxJQUFJLENBQUNHLEVBQUU7WUFDckI7WUFDQUMsUUFBUTtnQkFDTkQsSUFBSTtZQUNOO1FBQ0Y7UUFFQSxPQUFPWCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1lBQ3ZCQyxPQUFPLENBQUMsQ0FBQ0M7UUFDWDtJQUNGLEVBQUUsT0FBT0ssT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsNkJBQTZCQTtRQUMzQyxPQUFPYixxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBTTtJQUMxQztBQUNGIiwic291cmNlcyI6WyJEOlxcS2F5RFxccGxhc3RpYy13YXN0ZS13ZWJhcHAtbmV4dGpzXFxhcHBcXGFwaVxcYXV0aFxcdmFsaWRhdGUtc2Vzc2lvblxccm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aC9uZXh0XCI7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5pbXBvcnQgcHJpc21hIGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XG4gICAgXG4gICAgaWYgKCFzZXNzaW9uKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyB2YWxpZDogZmFsc2UgfSk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgdXNlciBzdGlsbCBleGlzdHNcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBpZDogc2Vzc2lvbi51c2VyLmlkXG4gICAgICB9LFxuICAgICAgc2VsZWN0OiB7XG4gICAgICAgIGlkOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBcbiAgICAgIHZhbGlkOiAhIXVzZXIgXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignU2Vzc2lvbiB2YWxpZGF0aW9uIGVycm9yOicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyB2YWxpZDogZmFsc2UgfSk7XG4gIH1cbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsInByaXNtYSIsIkdFVCIsInNlc3Npb24iLCJqc29uIiwidmFsaWQiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaWQiLCJzZWxlY3QiLCJlcnJvciIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/validate-session/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.js":
/*!************************!*\
  !*** ./lib/mongodb.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   getDb: () => (/* binding */ getDb)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nif (!process.env.MONGODB_URI) {\n    throw new Error('Please add your Mongo URI to .env.local');\n}\nconst uri = process.env.MONGODB_URI;\nconst options = {};\nlet client;\nlet clientPromise;\nif (true) {\n    // In development mode, use a global variable so that the value\n    // is preserved across module reloads caused by HMR (Hot Module Replacement).\n    if (!global._mongoClientPromise) {\n        client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri, options);\n        global._mongoClientPromise = client.connect();\n    }\n    clientPromise = global._mongoClientPromise;\n} else {}\nasync function getDb() {\n    const client = await clientPromise;\n    // Explicitly specify the database name\n    return client.db('plastic_management');\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clientPromise);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXNDO0FBRXRDLElBQUksQ0FBQ0MsUUFBUUMsR0FBRyxDQUFDQyxXQUFXLEVBQUU7SUFDNUIsTUFBTSxJQUFJQyxNQUFNO0FBQ2xCO0FBRUEsTUFBTUMsTUFBTUosUUFBUUMsR0FBRyxDQUFDQyxXQUFXO0FBQ25DLE1BQU1HLFVBQVUsQ0FBQztBQUVqQixJQUFJQztBQUNKLElBQUlDO0FBRUosSUFBSVAsSUFBc0MsRUFBRTtJQUMxQywrREFBK0Q7SUFDL0QsNkVBQTZFO0lBQzdFLElBQUksQ0FBQ1EsT0FBT0MsbUJBQW1CLEVBQUU7UUFDL0JILFNBQVMsSUFBSVAsZ0RBQVdBLENBQUNLLEtBQUtDO1FBQzlCRyxPQUFPQyxtQkFBbUIsR0FBR0gsT0FBT0ksT0FBTztJQUM3QztJQUNBSCxnQkFBZ0JDLE9BQU9DLG1CQUFtQjtBQUM1QyxPQUFPLEVBSU47QUFFTSxlQUFlRTtJQUNwQixNQUFNTCxTQUFTLE1BQU1DO0lBQ3JCLHVDQUF1QztJQUN2QyxPQUFPRCxPQUFPTSxFQUFFLENBQUM7QUFDbkI7QUFFQSxpRUFBZUwsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsiRDpcXEtheURcXHBsYXN0aWMtd2FzdGUtd2ViYXBwLW5leHRqc1xcbGliXFxtb25nb2RiLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvQ2xpZW50IH0gZnJvbSAnbW9uZ29kYic7XHJcblxyXG5pZiAoIXByb2Nlc3MuZW52Lk1PTkdPREJfVVJJKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgYWRkIHlvdXIgTW9uZ28gVVJJIHRvIC5lbnYubG9jYWwnKVxyXG59XHJcblxyXG5jb25zdCB1cmkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcclxuY29uc3Qgb3B0aW9ucyA9IHt9O1xyXG5cclxubGV0IGNsaWVudDtcclxubGV0IGNsaWVudFByb21pc2U7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAvLyBJbiBkZXZlbG9wbWVudCBtb2RlLCB1c2UgYSBnbG9iYWwgdmFyaWFibGUgc28gdGhhdCB0aGUgdmFsdWVcclxuICAvLyBpcyBwcmVzZXJ2ZWQgYWNyb3NzIG1vZHVsZSByZWxvYWRzIGNhdXNlZCBieSBITVIgKEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQpLlxyXG4gIGlmICghZ2xvYmFsLl9tb25nb0NsaWVudFByb21pc2UpIHtcclxuICAgIGNsaWVudCA9IG5ldyBNb25nb0NsaWVudCh1cmksIG9wdGlvbnMpO1xyXG4gICAgZ2xvYmFsLl9tb25nb0NsaWVudFByb21pc2UgPSBjbGllbnQuY29ubmVjdCgpO1xyXG4gIH1cclxuICBjbGllbnRQcm9taXNlID0gZ2xvYmFsLl9tb25nb0NsaWVudFByb21pc2U7XHJcbn0gZWxzZSB7XHJcbiAgLy8gSW4gcHJvZHVjdGlvbiBtb2RlLCBpdCdzIGJlc3QgdG8gbm90IHVzZSBhIGdsb2JhbCB2YXJpYWJsZS5cclxuICBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpLCBvcHRpb25zKTtcclxuICBjbGllbnRQcm9taXNlID0gY2xpZW50LmNvbm5lY3QoKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldERiKCkge1xyXG4gIGNvbnN0IGNsaWVudCA9IGF3YWl0IGNsaWVudFByb21pc2U7XHJcbiAgLy8gRXhwbGljaXRseSBzcGVjaWZ5IHRoZSBkYXRhYmFzZSBuYW1lXHJcbiAgcmV0dXJuIGNsaWVudC5kYigncGxhc3RpY19tYW5hZ2VtZW50Jyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsaWVudFByb21pc2U7ICJdLCJuYW1lcyI6WyJNb25nb0NsaWVudCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT0RCX1VSSSIsIkVycm9yIiwidXJpIiwib3B0aW9ucyIsImNsaWVudCIsImNsaWVudFByb21pc2UiLCJnbG9iYWwiLCJfbW9uZ29DbGllbnRQcm9taXNlIiwiY29ubmVjdCIsImdldERiIiwiZGIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.js\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.js":
/*!***********************!*\
  !*** ./lib/prisma.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ \"url\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dotenv */ \"(rsc)/./node_modules/dotenv/lib/main.js\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n// Load .env file\nconst __filename = (0,url__WEBPACK_IMPORTED_MODULE_2__.fileURLToPath)(\"file:///D:/KayD/plastic-waste-webapp-nextjs/lib/prisma.js\");\nconst __dirname = path__WEBPACK_IMPORTED_MODULE_1___default().dirname(__filename);\ndotenv__WEBPACK_IMPORTED_MODULE_3__.config({\n    path: path__WEBPACK_IMPORTED_MODULE_1___default().resolve(__dirname, '../.env')\n});\n// Log the MongoDB URI being used (with password hidden)\nconst dbUri = process.env.MONGODB_URI || '';\nconst maskedUri = dbUri.replace(/\\/\\/(.+?):(.+?)@/, '//***:***@');\nconsole.log(`Prisma connecting to: ${maskedUri}`);\n// Create database name accessor for logging\nconst getDatabaseName = ()=>{\n    if (!process.env.MONGODB_URI) return 'No URI found';\n    const parts = process.env.MONGODB_URI.split('/');\n    return parts[parts.length - 1].split('?')[0] || 'No database in URI';\n};\nconsole.log(`Database name: ${getDatabaseName()}`);\n// Set up Prisma client with explicit database URL\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n        datasources: {\n            db: {\n                url: process.env.MONGODB_URI\n            }\n        },\n        log: [\n            'query',\n            'error',\n            'warn'\n        ]\n    });\n};\n// Use global to prevent multiple instances\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma ?? prismaClientSingleton();\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUE4QztBQUN0QjtBQUNZO0FBQ0g7QUFFakMsaUJBQWlCO0FBQ2pCLE1BQU1JLGFBQWFGLGtEQUFhQSxDQUFDLDJEQUFlO0FBQ2hELE1BQU1JLFlBQVlMLG1EQUFZLENBQUNHO0FBQy9CRCwwQ0FBYSxDQUFDO0lBQUVGLE1BQU1BLG1EQUFZLENBQUNLLFdBQVc7QUFBVztBQUV6RCx3REFBd0Q7QUFDeEQsTUFBTUksUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxXQUFXLElBQUk7QUFDekMsTUFBTUMsWUFBWUosTUFBTUssT0FBTyxDQUFDLG9CQUFvQjtBQUNwREMsUUFBUUMsR0FBRyxDQUFDLENBQUMsc0JBQXNCLEVBQUVILFdBQVc7QUFFaEQsNENBQTRDO0FBQzVDLE1BQU1JLGtCQUFrQjtJQUN0QixJQUFJLENBQUNQLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVyxFQUFFLE9BQU87SUFDckMsTUFBTU0sUUFBUVIsUUFBUUMsR0FBRyxDQUFDQyxXQUFXLENBQUNPLEtBQUssQ0FBQztJQUM1QyxPQUFPRCxLQUFLLENBQUNBLE1BQU1FLE1BQU0sR0FBRyxFQUFFLENBQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJO0FBQ2xEO0FBRUFKLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLGVBQWUsRUFBRUMsbUJBQW1CO0FBRWpELGtEQUFrRDtBQUNsRCxNQUFNSSx3QkFBd0I7SUFDNUIsT0FBTyxJQUFJdEIsd0RBQVlBLENBQUM7UUFDdEJ1QixhQUFhO1lBQ1hDLElBQUk7Z0JBQ0ZuQixLQUFLTSxRQUFRQyxHQUFHLENBQUNDLFdBQVc7WUFDOUI7UUFDRjtRQUNBSSxLQUFLO1lBQUM7WUFBUztZQUFTO1NBQU87SUFDakM7QUFDRjtBQUVBLDJDQUEyQztBQUMzQyxNQUFNUSxrQkFBa0JDO0FBQ3hCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJTDtBQUV6QyxJQUFJWCxJQUFxQyxFQUFFYyxnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkQ6XFxLYXlEXFxwbGFzdGljLXdhc3RlLXdlYmFwcC1uZXh0anNcXGxpYlxccHJpc21hLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xyXG5pbXBvcnQgKiBhcyBkb3RlbnYgZnJvbSAnZG90ZW52JztcclxuXHJcbi8vIExvYWQgLmVudiBmaWxlXHJcbmNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XHJcbmNvbnN0IF9fZGlybmFtZSA9IHBhdGguZGlybmFtZShfX2ZpbGVuYW1lKTtcclxuZG90ZW52LmNvbmZpZyh7IHBhdGg6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uZW52JykgfSk7XHJcblxyXG4vLyBMb2cgdGhlIE1vbmdvREIgVVJJIGJlaW5nIHVzZWQgKHdpdGggcGFzc3dvcmQgaGlkZGVuKVxyXG5jb25zdCBkYlVyaSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJIHx8ICcnO1xyXG5jb25zdCBtYXNrZWRVcmkgPSBkYlVyaS5yZXBsYWNlKC9cXC9cXC8oLis/KTooLis/KUAvLCAnLy8qKio6KioqQCcpO1xyXG5jb25zb2xlLmxvZyhgUHJpc21hIGNvbm5lY3RpbmcgdG86ICR7bWFza2VkVXJpfWApO1xyXG5cclxuLy8gQ3JlYXRlIGRhdGFiYXNlIG5hbWUgYWNjZXNzb3IgZm9yIGxvZ2dpbmdcclxuY29uc3QgZ2V0RGF0YWJhc2VOYW1lID0gKCkgPT4ge1xyXG4gIGlmICghcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkkpIHJldHVybiAnTm8gVVJJIGZvdW5kJztcclxuICBjb25zdCBwYXJ0cyA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJLnNwbGl0KCcvJyk7XHJcbiAgcmV0dXJuIHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdLnNwbGl0KCc/JylbMF0gfHwgJ05vIGRhdGFiYXNlIGluIFVSSSc7XHJcbn07XHJcblxyXG5jb25zb2xlLmxvZyhgRGF0YWJhc2UgbmFtZTogJHtnZXREYXRhYmFzZU5hbWUoKX1gKTtcclxuXHJcbi8vIFNldCB1cCBQcmlzbWEgY2xpZW50IHdpdGggZXhwbGljaXQgZGF0YWJhc2UgVVJMXHJcbmNvbnN0IHByaXNtYUNsaWVudFNpbmdsZXRvbiA9ICgpID0+IHtcclxuICByZXR1cm4gbmV3IFByaXNtYUNsaWVudCh7XHJcbiAgICBkYXRhc291cmNlczoge1xyXG4gICAgICBkYjoge1xyXG4gICAgICAgIHVybDogcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgbG9nOiBbJ3F1ZXJ5JywgJ2Vycm9yJywgJ3dhcm4nXSxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIFVzZSBnbG9iYWwgdG8gcHJldmVudCBtdWx0aXBsZSBpbnN0YW5jZXNcclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsO1xyXG5jb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/IHByaXNtYUNsaWVudFNpbmdsZXRvbigpO1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmlzbWE7ICJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwYXRoIiwiZmlsZVVSTFRvUGF0aCIsImRvdGVudiIsIl9fZmlsZW5hbWUiLCJ1cmwiLCJfX2Rpcm5hbWUiLCJkaXJuYW1lIiwiY29uZmlnIiwicmVzb2x2ZSIsImRiVXJpIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwibWFza2VkVXJpIiwicmVwbGFjZSIsImNvbnNvbGUiLCJsb2ciLCJnZXREYXRhYmFzZU5hbWUiLCJwYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwicHJpc21hQ2xpZW50U2luZ2xldG9uIiwiZGF0YXNvdXJjZXMiLCJkYiIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbCIsInByaXNtYSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fvalidate-session%2Froute&page=%2Fapi%2Fauth%2Fvalidate-session%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fvalidate-session%2Froute.js&appDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fvalidate-session%2Froute&page=%2Fapi%2Fauth%2Fvalidate-session%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fvalidate-session%2Froute.js&appDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_KayD_plastic_waste_webapp_nextjs_app_api_auth_validate_session_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/validate-session/route.js */ \"(rsc)/./app/api/auth/validate-session/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/validate-session/route\",\n        pathname: \"/api/auth/validate-session\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/validate-session/route\"\n    },\n    resolvedPagePath: \"D:\\\\KayD\\\\plastic-waste-webapp-nextjs\\\\app\\\\api\\\\auth\\\\validate-session\\\\route.js\",\n    nextConfigOutput,\n    userland: D_KayD_plastic_waste_webapp_nextjs_app_api_auth_validate_session_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGdmFsaWRhdGUtc2Vzc2lvbiUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYXV0aCUyRnZhbGlkYXRlLXNlc3Npb24lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhdXRoJTJGdmFsaWRhdGUtc2Vzc2lvbiUyRnJvdXRlLmpzJmFwcERpcj1EJTNBJTVDS2F5RCU1Q3BsYXN0aWMtd2FzdGUtd2ViYXBwLW5leHRqcyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9RCUzQSU1Q0theUQlNUNwbGFzdGljLXdhc3RlLXdlYmFwcC1uZXh0anMmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2lDO0FBQzlHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJEOlxcXFxLYXlEXFxcXHBsYXN0aWMtd2FzdGUtd2ViYXBwLW5leHRqc1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcdmFsaWRhdGUtc2Vzc2lvblxcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC92YWxpZGF0ZS1zZXNzaW9uL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC92YWxpZGF0ZS1zZXNzaW9uXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL3ZhbGlkYXRlLXNlc3Npb24vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJEOlxcXFxLYXlEXFxcXHBsYXN0aWMtd2FzdGUtd2ViYXBwLW5leHRqc1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcdmFsaWRhdGUtc2Vzc2lvblxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fvalidate-session%2Froute&page=%2Fapi%2Fauth%2Fvalidate-session%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fvalidate-session%2Froute.js&appDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongodb");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/dotenv"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fvalidate-session%2Froute&page=%2Fapi%2Fauth%2Fvalidate-session%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fvalidate-session%2Froute.js&appDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();