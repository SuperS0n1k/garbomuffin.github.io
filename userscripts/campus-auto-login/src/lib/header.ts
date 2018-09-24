/* === CAMPUS AUTO LOGIN v3.7.4 ===
 * v3.7.4: Disable auto login on teacher login for my.pltw.org & improve browser support
 * v3.7.2 & 3.7.3: Improve wordplay.com support so you don't need to refresh the login page
 * v3.7.1: Added basic support for GreaseMonkey (config page broken)
 * v3.7: Added support for my.pltw.org (actually pltw.auth0.com) and vhlcentral.com
 * v3.6: Added support for wordplay.com
 * 
 * Supported sites:
 * Old Portal: https://campus.district112.org/campus/portal/isd112.jsp
 * New Portal: https://campus.district112.org/campus/portal/students/isd112.jsp
 * TCI: https://student.teachtci.com/student/sign_in
 * BIM: https://www.bigideasmath.com/BIM/login
 * Empower: https://empower.district112.org
 * Wordplay: https://wordplay.com/
 * My PLTW (Student): https://my.pltw.org/ (actually pltw.auth0.com)
 * VHL Central: https://vhlcentral.com/
 *
 * Config: https://garbomuffin.github.io/userscripts/campus-auto-login/config.html
 *
 * Usage depends on the site.
 * See the website for usage information.
 * https://garbomuffin.github.io/userscripts/campus-auto-login/#supported
 */

/*
Copyright (c) 2018 GarboMuffin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Source Code: https://github.com/GarboMuffin/garbomuffin.github.io/tree/master/userscripts/campus-auto-login/src

export var DUMMY_VAR_TO_PUT_HEADER_AT_TOP_OF_FILE = "";
