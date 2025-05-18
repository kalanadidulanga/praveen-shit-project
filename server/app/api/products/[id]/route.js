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
exports.id = "app/api/products/[id]/route";
exports.ids = ["app/api/products/[id]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.js":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.js\");\n\n\n\n // Use the MongoDB connection directly\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: 'Credentials',\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\",\n                    placeholder: \"email@example.com\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                try {\n                    if (!credentials?.email || !credentials?.password) {\n                        throw new Error('Email and password are required');\n                    }\n                    // Use the MongoDB connection directly\n                    const db = await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_3__.getDb)();\n                    const usersCollection = db.collection('User');\n                    // Find the user\n                    const user = await usersCollection.findOne({\n                        email: credentials.email\n                    });\n                    if (!user) {\n                        console.log(`No user found with email: ${credentials.email}`);\n                        return null;\n                    }\n                    const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].compare(credentials.password, user.password);\n                    if (!isPasswordValid) {\n                        console.log('Invalid password');\n                        return null;\n                    }\n                    console.log('User authenticated successfully:', user.email);\n                    return {\n                        id: user._id.toString(),\n                        email: user.email,\n                        name: user.name,\n                        userType: user.userType,\n                        image: user.profileImage\n                    };\n                } catch (error) {\n                    console.error(\"Authorization error:\", error);\n                    return null;\n                }\n            }\n        })\n    ],\n    pages: {\n        signIn: '/login',\n        signOut: '/',\n        error: '/login'\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.userType = user.userType;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token && session.user) {\n                session.user.id = token.id;\n                session.user.userType = token.userType;\n            }\n            return session;\n        }\n    },\n    session: {\n        strategy: 'jwt',\n        maxAge: 30 * 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET,\n    debug: true\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFpQztBQUNpQztBQUNwQztBQUNRLENBQUMsc0NBQXNDO0FBRXRFLE1BQU1JLGNBQWM7SUFDekJDLFdBQVc7UUFDVEosMkVBQW1CQSxDQUFDO1lBQ2xCSyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07b0JBQVNDLGFBQWE7Z0JBQW9CO2dCQUN6RUMsVUFBVTtvQkFBRUgsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1HLFdBQVVOLFdBQVc7Z0JBQ3pCLElBQUk7b0JBQ0YsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFLLFVBQVU7d0JBQ2pELE1BQU0sSUFBSUUsTUFBTTtvQkFDbEI7b0JBRUEsc0NBQXNDO29CQUN0QyxNQUFNQyxLQUFLLE1BQU1aLG1EQUFLQTtvQkFDdEIsTUFBTWEsa0JBQWtCRCxHQUFHRSxVQUFVLENBQUM7b0JBRXRDLGdCQUFnQjtvQkFDaEIsTUFBTUMsT0FBTyxNQUFNRixnQkFBZ0JHLE9BQU8sQ0FBQzt3QkFBRVgsT0FBT0QsWUFBWUMsS0FBSztvQkFBQztvQkFFdEUsSUFBSSxDQUFDVSxNQUFNO3dCQUNURSxRQUFRQyxHQUFHLENBQUMsQ0FBQywwQkFBMEIsRUFBRWQsWUFBWUMsS0FBSyxFQUFFO3dCQUM1RCxPQUFPO29CQUNUO29CQUVBLE1BQU1jLGtCQUFrQixNQUFNcEIsd0RBQWMsQ0FBQ0ssWUFBWUssUUFBUSxFQUFFTSxLQUFLTixRQUFRO29CQUVoRixJQUFJLENBQUNVLGlCQUFpQjt3QkFDcEJGLFFBQVFDLEdBQUcsQ0FBQzt3QkFDWixPQUFPO29CQUNUO29CQUVBRCxRQUFRQyxHQUFHLENBQUMsb0NBQW9DSCxLQUFLVixLQUFLO29CQUMxRCxPQUFPO3dCQUNMZ0IsSUFBSU4sS0FBS08sR0FBRyxDQUFDQyxRQUFRO3dCQUNyQmxCLE9BQU9VLEtBQUtWLEtBQUs7d0JBQ2pCRixNQUFNWSxLQUFLWixJQUFJO3dCQUNmcUIsVUFBVVQsS0FBS1MsUUFBUTt3QkFDdkJDLE9BQU9WLEtBQUtXLFlBQVk7b0JBQzFCO2dCQUNGLEVBQUUsT0FBT0MsT0FBTztvQkFDZFYsUUFBUVUsS0FBSyxDQUFDLHdCQUF3QkE7b0JBQ3RDLE9BQU87Z0JBQ1Q7WUFDRjtRQUNGO0tBQ0Q7SUFDREMsT0FBTztRQUNMQyxRQUFRO1FBQ1JDLFNBQVM7UUFDVEgsT0FBTztJQUNUO0lBQ0FJLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRWxCLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSa0IsTUFBTVosRUFBRSxHQUFHTixLQUFLTSxFQUFFO2dCQUNsQlksTUFBTVQsUUFBUSxHQUFHVCxLQUFLUyxRQUFRO1lBQ2hDO1lBQ0EsT0FBT1M7UUFDVDtRQUNBLE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFRCxLQUFLLEVBQUU7WUFDOUIsSUFBSUEsU0FBU0MsUUFBUW5CLElBQUksRUFBRTtnQkFDekJtQixRQUFRbkIsSUFBSSxDQUFDTSxFQUFFLEdBQUdZLE1BQU1aLEVBQUU7Z0JBQzFCYSxRQUFRbkIsSUFBSSxDQUFDUyxRQUFRLEdBQUdTLE1BQU1ULFFBQVE7WUFDeEM7WUFDQSxPQUFPVTtRQUNUO0lBQ0Y7SUFDQUEsU0FBUztRQUNQQyxVQUFVO1FBQ1ZDLFFBQVEsS0FBSyxLQUFLLEtBQUs7SUFDekI7SUFDQUMsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxlQUFlO0lBQ25DQyxPQUFPO0FBQ1QsRUFBRTtBQUVGLE1BQU1DLFVBQVU3QyxnREFBUUEsQ0FBQ0k7QUFFa0IiLCJzb3VyY2VzIjpbIkQ6XFxLYXlEXFxwbGFzdGljLXdhc3RlLXdlYmFwcC1uZXh0anNcXGFwcFxcYXBpXFxhdXRoXFxbLi4ubmV4dGF1dGhdXFxyb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJztcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHMnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgeyBnZXREYiB9IGZyb20gJ0AvbGliL21vbmdvZGInOyAvLyBVc2UgdGhlIE1vbmdvREIgY29ubmVjdGlvbiBkaXJlY3RseVxuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnMgPSB7XG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogJ0NyZWRlbnRpYWxzJyxcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiwgcGxhY2Vob2xkZXI6IFwiZW1haWxAZXhhbXBsZS5jb21cIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfVxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRW1haWwgYW5kIHBhc3N3b3JkIGFyZSByZXF1aXJlZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFVzZSB0aGUgTW9uZ29EQiBjb25uZWN0aW9uIGRpcmVjdGx5XG4gICAgICAgICAgY29uc3QgZGIgPSBhd2FpdCBnZXREYigpO1xuICAgICAgICAgIGNvbnN0IHVzZXJzQ29sbGVjdGlvbiA9IGRiLmNvbGxlY3Rpb24oJ1VzZXInKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBGaW5kIHRoZSB1c2VyXG4gICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHVzZXJzQ29sbGVjdGlvbi5maW5kT25lKHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0pO1xuXG4gICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgTm8gdXNlciBmb3VuZCB3aXRoIGVtYWlsOiAke2NyZWRlbnRpYWxzLmVtYWlsfWApO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuXG4gICAgICAgICAgaWYgKCFpc1Bhc3N3b3JkVmFsaWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zb2xlLmxvZygnVXNlciBhdXRoZW50aWNhdGVkIHN1Y2Nlc3NmdWxseTonLCB1c2VyLmVtYWlsKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHVzZXIuX2lkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgIHVzZXJUeXBlOiB1c2VyLnVzZXJUeXBlLFxuICAgICAgICAgICAgaW1hZ2U6IHVzZXIucHJvZmlsZUltYWdlLFxuICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkF1dGhvcml6YXRpb24gZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnL2xvZ2luJyxcbiAgICBzaWduT3V0OiAnLycsXG4gICAgZXJyb3I6ICcvbG9naW4nLFxuICB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XG4gICAgICAgIHRva2VuLnVzZXJUeXBlID0gdXNlci51c2VyVHlwZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAodG9rZW4gJiYgc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkO1xuICAgICAgICBzZXNzaW9uLnVzZXIudXNlclR5cGUgPSB0b2tlbi51c2VyVHlwZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgIH1cbiAgfSxcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiAnand0JyxcbiAgICBtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkYXlzXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxuICBkZWJ1ZzogdHJ1ZSwgLy8gRW5hYmxlIGRlYnVnIG1vZGUgZm9yIHRyb3VibGVzaG9vdGluZ1xufTtcblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKTtcblxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9OyAiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiYmNyeXB0IiwiZ2V0RGIiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsIkVycm9yIiwiZGIiLCJ1c2Vyc0NvbGxlY3Rpb24iLCJjb2xsZWN0aW9uIiwidXNlciIsImZpbmRPbmUiLCJjb25zb2xlIiwibG9nIiwiaXNQYXNzd29yZFZhbGlkIiwiY29tcGFyZSIsImlkIiwiX2lkIiwidG9TdHJpbmciLCJ1c2VyVHlwZSIsImltYWdlIiwicHJvZmlsZUltYWdlIiwiZXJyb3IiLCJwYWdlcyIsInNpZ25JbiIsInNpZ25PdXQiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInNlc3Npb24iLCJzdHJhdGVneSIsIm1heEFnZSIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJkZWJ1ZyIsImhhbmRsZXIiLCJHRVQiLCJQT1NUIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.js\n");

/***/ }),

/***/ "(rsc)/./app/api/products/[id]/route.js":
/*!****************************************!*\
  !*** ./app/api/products/[id]/route.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.js\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var _app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/app/api/auth/[...nextauth]/route */ \"(rsc)/./app/api/auth/[...nextauth]/route.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.js\");\n\n\n\n\n\n\nasync function GET(request, { params }) {\n    try {\n        const resolvedParams = await params;\n        const id = resolvedParams.id;\n        // Return early if this is the create route\n        if (id === 'create') {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid product ID'\n            }, {\n                status: 400\n            });\n        }\n        if (!id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Product ID is required'\n            }, {\n                status: 400\n            });\n        }\n        let productId;\n        try {\n            productId = new mongodb__WEBPACK_IMPORTED_MODULE_2__.ObjectId(id);\n        } catch (error) {\n            console.error('Invalid ObjectId:', id);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid product ID format'\n            }, {\n                status: 400\n            });\n        }\n        const db = await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__.getDb)();\n        const product = await db.collection('Product').findOne({\n            _id: productId\n        });\n        if (!product) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Product not found'\n            }, {\n                status: 404\n            });\n        }\n        // Get seller information if sellerId exists\n        let seller = null;\n        if (product.sellerId) {\n            // Changed collection name from 'users' to 'User' to be consistent\n            seller = await db.collection('User').findOne({\n                _id: new mongodb__WEBPACK_IMPORTED_MODULE_2__.ObjectId(product.sellerId)\n            }, {\n                projection: {\n                    name: 1,\n                    userType: 1\n                }\n            });\n        }\n        // Format the response\n        const formattedProduct = {\n            ...product,\n            _id: product._id.toString(),\n            sellerId: product.sellerId?.toString(),\n            seller: seller ? {\n                name: seller.name,\n                id: seller._id.toString(),\n                userType: seller.userType\n            } : {\n                name: 'Unknown Seller',\n                id: null,\n                userType: 'unknown'\n            },\n            createdAt: product.createdAt ? new Date(product.createdAt).toISOString() : new Date().toISOString()\n        };\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            product: formattedProduct\n        });\n    } catch (error) {\n        console.error('Error in GET product:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to fetch product'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function DELETE(request, { params }) {\n    try {\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_3__.getServerSession)(_app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_4__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const productId = params.id;\n        // Verify the product exists and belongs to the user\n        const product = await _lib_prisma__WEBPACK_IMPORTED_MODULE_5__[\"default\"].product.findUnique({\n            where: {\n                id: productId\n            }\n        });\n        if (!product) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Product not found\"\n            }, {\n                status: 404\n            });\n        }\n        if (product.sellerId !== session.user.id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"You can only delete your own products\"\n            }, {\n                status: 403\n            });\n        }\n        // Delete the product\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_5__[\"default\"].product.delete({\n            where: {\n                id: productId\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: \"Product deleted successfully\"\n        });\n    } catch (error) {\n        console.error(\"Error deleting product:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: \"Failed to delete product\",\n            details: error.message\n        }, {\n            status: 500\n        });\n    }\n}\nasync function PATCH(request, { params }) {\n    try {\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_3__.getServerSession)(_app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_4__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const productId = params.id;\n        const data = await request.json();\n        // Verify the product exists and belongs to the user\n        const existingProduct = await _lib_prisma__WEBPACK_IMPORTED_MODULE_5__[\"default\"].product.findUnique({\n            where: {\n                id: productId\n            }\n        });\n        if (!existingProduct) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Product not found\"\n            }, {\n                status: 404\n            });\n        }\n        if (existingProduct.sellerId !== session.user.id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"You can only update your own products\"\n            }, {\n                status: 403\n            });\n        }\n        // Update the product\n        const updatedProduct = await _lib_prisma__WEBPACK_IMPORTED_MODULE_5__[\"default\"].product.update({\n            where: {\n                id: productId\n            },\n            data: {\n                name: data.name,\n                price: parseFloat(data.price),\n                category: data.category,\n                description: data.description,\n                image: data.image,\n                quantity: parseInt(data.quantity),\n                unit: data.unit || \"kg\",\n                plasticType: data.plasticType,\n                discount: parseInt(data.discount) || 0,\n                rewardPoints: parseInt(data.rewardPoints) || 0,\n                updatedAt: new Date()\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: \"Product updated successfully\",\n            product: updatedProduct\n        });\n    } catch (error) {\n        console.error(\"Error updating product:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: \"Failed to update product\",\n            details: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFDdkIwQixTQUFTO1lBQ1RDLFNBQVM7WUFDVHJCLFNBQVMwQjtRQUNYO0lBQ0YsRUFBRSxPQUFPL0IsT0FBTztRQUNkRyxRQUFRSCxLQUFLLENBQUMsMkJBQTJCQTtRQUN6QyxPQUFPWixxREFBWUEsQ0FBQ1csSUFBSSxDQUN0QjtZQUNFMEIsU0FBUztZQUNUekIsT0FBTztZQUNQMkIsU0FBUzNCLE1BQU0wQixPQUFPO1FBQ3hCLEdBQ0E7WUFBRXpCLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJEOlxcS2F5RFxccGxhc3RpYy13YXN0ZS13ZWJhcHAtbmV4dGpzXFxhcHBcXGFwaVxccHJvZHVjdHNcXFtpZF1cXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgZ2V0RGIgfSBmcm9tICdAL2xpYi9tb25nb2RiJztcbmltcG9ydCB7IE9iamVjdElkIH0gZnJvbSAnbW9uZ29kYic7XG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aC9uZXh0XCI7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5pbXBvcnQgcHJpc21hIGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0LCB7IHBhcmFtcyB9KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzb2x2ZWRQYXJhbXMgPSBhd2FpdCBwYXJhbXM7XG4gICAgY29uc3QgaWQgPSByZXNvbHZlZFBhcmFtcy5pZDtcbiAgICBcbiAgICAvLyBSZXR1cm4gZWFybHkgaWYgdGhpcyBpcyB0aGUgY3JlYXRlIHJvdXRlXG4gICAgaWYgKGlkID09PSAnY3JlYXRlJykge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdJbnZhbGlkIHByb2R1Y3QgSUQnIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdQcm9kdWN0IElEIGlzIHJlcXVpcmVkJyB9LCB7IHN0YXR1czogNDAwIH0pO1xuICAgIH1cblxuICAgIGxldCBwcm9kdWN0SWQ7XG4gICAgdHJ5IHtcbiAgICAgIHByb2R1Y3RJZCA9IG5ldyBPYmplY3RJZChpZCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgT2JqZWN0SWQ6JywgaWQpO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdJbnZhbGlkIHByb2R1Y3QgSUQgZm9ybWF0JyB9LCB7IHN0YXR1czogNDAwIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGIoKTtcbiAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgZGIuY29sbGVjdGlvbignUHJvZHVjdCcpLmZpbmRPbmUoeyBfaWQ6IHByb2R1Y3RJZCB9KTtcbiAgICBcbiAgICBpZiAoIXByb2R1Y3QpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnUHJvZHVjdCBub3QgZm91bmQnIH0sIHsgc3RhdHVzOiA0MDQgfSk7XG4gICAgfVxuXG4gICAgLy8gR2V0IHNlbGxlciBpbmZvcm1hdGlvbiBpZiBzZWxsZXJJZCBleGlzdHNcbiAgICBsZXQgc2VsbGVyID0gbnVsbDtcbiAgICBpZiAocHJvZHVjdC5zZWxsZXJJZCkge1xuICAgICAgLy8gQ2hhbmdlZCBjb2xsZWN0aW9uIG5hbWUgZnJvbSAndXNlcnMnIHRvICdVc2VyJyB0byBiZSBjb25zaXN0ZW50XG4gICAgICBzZWxsZXIgPSBhd2FpdCBkYi5jb2xsZWN0aW9uKCdVc2VyJykuZmluZE9uZShcbiAgICAgICAgeyBfaWQ6IG5ldyBPYmplY3RJZChwcm9kdWN0LnNlbGxlcklkKSB9LFxuICAgICAgICB7IHByb2plY3Rpb246IHsgbmFtZTogMSwgdXNlclR5cGU6IDEgfSB9XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEZvcm1hdCB0aGUgcmVzcG9uc2VcbiAgICBjb25zdCBmb3JtYXR0ZWRQcm9kdWN0ID0ge1xuICAgICAgLi4ucHJvZHVjdCxcbiAgICAgIF9pZDogcHJvZHVjdC5faWQudG9TdHJpbmcoKSxcbiAgICAgIHNlbGxlcklkOiBwcm9kdWN0LnNlbGxlcklkPy50b1N0cmluZygpLFxuICAgICAgc2VsbGVyOiBzZWxsZXIgPyB7XG4gICAgICAgIG5hbWU6IHNlbGxlci5uYW1lLFxuICAgICAgICBpZDogc2VsbGVyLl9pZC50b1N0cmluZygpLFxuICAgICAgICB1c2VyVHlwZTogc2VsbGVyLnVzZXJUeXBlXG4gICAgICB9IDoge1xuICAgICAgICBuYW1lOiAnVW5rbm93biBTZWxsZXInLFxuICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgdXNlclR5cGU6ICd1bmtub3duJ1xuICAgICAgfSxcbiAgICAgIGNyZWF0ZWRBdDogcHJvZHVjdC5jcmVhdGVkQXQgPyBuZXcgRGF0ZShwcm9kdWN0LmNyZWF0ZWRBdCkudG9JU09TdHJpbmcoKSA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgIH07XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBwcm9kdWN0OiBmb3JtYXR0ZWRQcm9kdWN0IH0pO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIEdFVCBwcm9kdWN0OicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIHByb2R1Y3QnIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBERUxFVEUocmVxdWVzdCwgeyBwYXJhbXMgfSkge1xuICB0cnkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcbiAgICBcbiAgICBpZiAoIXNlc3Npb24pIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvZHVjdElkID0gcGFyYW1zLmlkO1xuICAgIFxuICAgIC8vIFZlcmlmeSB0aGUgcHJvZHVjdCBleGlzdHMgYW5kIGJlbG9uZ3MgdG8gdGhlIHVzZXJcbiAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgcHJpc21hLnByb2R1Y3QuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogcHJvZHVjdElkIH1cbiAgICB9KTtcblxuICAgIGlmICghcHJvZHVjdCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiUHJvZHVjdCBub3QgZm91bmRcIiB9LCB7IHN0YXR1czogNDA0IH0pO1xuICAgIH1cblxuICAgIGlmIChwcm9kdWN0LnNlbGxlcklkICE9PSBzZXNzaW9uLnVzZXIuaWQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIllvdSBjYW4gb25seSBkZWxldGUgeW91ciBvd24gcHJvZHVjdHNcIiB9LCB7IHN0YXR1czogNDAzIH0pO1xuICAgIH1cblxuICAgIC8vIERlbGV0ZSB0aGUgcHJvZHVjdFxuICAgIGF3YWl0IHByaXNtYS5wcm9kdWN0LmRlbGV0ZSh7XG4gICAgICB3aGVyZTogeyBpZDogcHJvZHVjdElkIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IFxuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6IFwiUHJvZHVjdCBkZWxldGVkIHN1Y2Nlc3NmdWxseVwiIFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBwcm9kdWN0OlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiBcIkZhaWxlZCB0byBkZWxldGUgcHJvZHVjdFwiLFxuICAgICAgICBkZXRhaWxzOiBlcnJvci5tZXNzYWdlIFxuICAgICAgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBBVENIKHJlcXVlc3QsIHsgcGFyYW1zIH0pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XG4gICAgXG4gICAgaWYgKCFzZXNzaW9uKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHByb2R1Y3RJZCA9IHBhcmFtcy5pZDtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG4gICAgXG4gICAgLy8gVmVyaWZ5IHRoZSBwcm9kdWN0IGV4aXN0cyBhbmQgYmVsb25ncyB0byB0aGUgdXNlclxuICAgIGNvbnN0IGV4aXN0aW5nUHJvZHVjdCA9IGF3YWl0IHByaXNtYS5wcm9kdWN0LmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9XG4gICAgfSk7XG5cbiAgICBpZiAoIWV4aXN0aW5nUHJvZHVjdCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiUHJvZHVjdCBub3QgZm91bmRcIiB9LCB7IHN0YXR1czogNDA0IH0pO1xuICAgIH1cblxuICAgIGlmIChleGlzdGluZ1Byb2R1Y3Quc2VsbGVySWQgIT09IHNlc3Npb24udXNlci5pZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiWW91IGNhbiBvbmx5IHVwZGF0ZSB5b3VyIG93biBwcm9kdWN0c1wiIH0sIHsgc3RhdHVzOiA0MDMgfSk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHRoZSBwcm9kdWN0XG4gICAgY29uc3QgdXBkYXRlZFByb2R1Y3QgPSBhd2FpdCBwcmlzbWEucHJvZHVjdC51cGRhdGUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgIHByaWNlOiBwYXJzZUZsb2F0KGRhdGEucHJpY2UpLFxuICAgICAgICBjYXRlZ29yeTogZGF0YS5jYXRlZ29yeSxcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgIGltYWdlOiBkYXRhLmltYWdlLFxuICAgICAgICBxdWFudGl0eTogcGFyc2VJbnQoZGF0YS5xdWFudGl0eSksXG4gICAgICAgIHVuaXQ6IGRhdGEudW5pdCB8fCBcImtnXCIsXG4gICAgICAgIHBsYXN0aWNUeXBlOiBkYXRhLnBsYXN0aWNUeXBlLFxuICAgICAgICBkaXNjb3VudDogcGFyc2VJbnQoZGF0YS5kaXNjb3VudCkgfHwgMCxcbiAgICAgICAgcmV3YXJkUG9pbnRzOiBwYXJzZUludChkYXRhLnJld2FyZFBvaW50cykgfHwgMCxcbiAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBtZXNzYWdlOiBcIlByb2R1Y3QgdXBkYXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgIHByb2R1Y3Q6IHVwZGF0ZWRQcm9kdWN0XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwZGF0aW5nIHByb2R1Y3Q6XCIsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IFxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIHVwZGF0ZSBwcm9kdWN0XCIsXG4gICAgICAgIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UgXG4gICAgICB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0RGIiLCJPYmplY3RJZCIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsInByaXNtYSIsIkdFVCIsInJlcXVlc3QiLCJwYXJhbXMiLCJyZXNvbHZlZFBhcmFtcyIsImlkIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwicHJvZHVjdElkIiwiY29uc29sZSIsImRiIiwicHJvZHVjdCIsImNvbGxlY3Rpb24iLCJmaW5kT25lIiwiX2lkIiwic2VsbGVyIiwic2VsbGVySWQiLCJwcm9qZWN0aW9uIiwibmFtZSIsInVzZXJUeXBlIiwiZm9ybWF0dGVkUHJvZHVjdCIsInRvU3RyaW5nIiwiY3JlYXRlZEF0IiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiREVMRVRFIiwic2Vzc2lvbiIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsInVzZXIiLCJkZWxldGUiLCJzdWNjZXNzIiwibWVzc2FnZSIsImRldGFpbHMiLCJQQVRDSCIsImRhdGEiLCJleGlzdGluZ1Byb2R1Y3QiLCJ1cGRhdGVkUHJvZHVjdCIsInVwZGF0ZSIsInByaWNlIiwicGFyc2VGbG9hdCIsImNhdGVnb3J5IiwiZGVzY3JpcHRpb24iLCJpbWFnZSIsInF1YW50aXR5IiwicGFyc2VJbnQiLCJ1bml0IiwicGxhc3RpY1R5cGUiLCJkaXNjb3VudCIsInJld2FyZFBvaW50cyIsInVwZGF0ZWRBdCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/products/[id]/route.js\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2F%5Bid%5D%2Froute&page=%2Fapi%2Fproducts%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2F%5Bid%5D%2Froute.js&appDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2F%5Bid%5D%2Froute&page=%2Fapi%2Fproducts%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2F%5Bid%5D%2Froute.js&appDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_KayD_plastic_waste_webapp_nextjs_app_api_products_id_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/products/[id]/route.js */ \"(rsc)/./app/api/products/[id]/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/products/[id]/route\",\n        pathname: \"/api/products/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/products/[id]/route\"\n    },\n    resolvedPagePath: \"D:\\\\KayD\\\\plastic-waste-webapp-nextjs\\\\app\\\\api\\\\products\\\\[id]\\\\route.js\",\n    nextConfigOutput,\n    userland: D_KayD_plastic_waste_webapp_nextjs_app_api_products_id_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwcm9kdWN0cyUyRiU1QmlkJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZwcm9kdWN0cyUyRiU1QmlkJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcHJvZHVjdHMlMkYlNUJpZCU1RCUyRnJvdXRlLmpzJmFwcERpcj1EJTNBJTVDS2F5RCU1Q3BsYXN0aWMtd2FzdGUtd2ViYXBwLW5leHRqcyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9RCUzQSU1Q0theUQlNUNwbGFzdGljLXdhc3RlLXdlYmFwcC1uZXh0anMmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3lCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJEOlxcXFxLYXlEXFxcXHBsYXN0aWMtd2FzdGUtd2ViYXBwLW5leHRqc1xcXFxhcHBcXFxcYXBpXFxcXHByb2R1Y3RzXFxcXFtpZF1cXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3Byb2R1Y3RzL1tpZF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9wcm9kdWN0cy9baWRdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9wcm9kdWN0cy9baWRdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcS2F5RFxcXFxwbGFzdGljLXdhc3RlLXdlYmFwcC1uZXh0anNcXFxcYXBwXFxcXGFwaVxcXFxwcm9kdWN0c1xcXFxbaWRdXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2F%5Bid%5D%2Froute&page=%2Fapi%2Fproducts%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2F%5Bid%5D%2Froute.js&appDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/dotenv"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2F%5Bid%5D%2Froute&page=%2Fapi%2Fproducts%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2F%5Bid%5D%2Froute.js&appDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKayD%5Cplastic-waste-webapp-nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();