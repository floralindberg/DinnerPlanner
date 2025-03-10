import fs from "fs";
import path from "path";

import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

import solidPlugin from 'vite-plugin-solid';
import virtualHtml from 'vite-plugin-virtual-html';
import vuePlugin from '@vitejs/plugin-vue';
//import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
//import reactJsxPlugin from '@vitejs/plugin-react';
import {username, semester, telemetryUserInfo} from "./test/telemetryConfig.js";

// if solved-X.js (or .jsx or .vue or .css) exists, then solved-X.js is tested, otherwise  X.js
const prefix=  fs.existsSync("./src/solved-utilities.js")?"solved-":"";

// we map every tw/tw*.jsx file to a virtual HTML available at http://localhost:PORT/tw*.html
const tws= fs.readdirSync("./tw").filter(function(file){return path.parse(file).ext===".jsx" && path.parse(file).name.startsWith("tw");});

const pages= {
/*    "index": {     // only works with the solid plugin!
        entry: 'src/index.jsx',
        body: '<div id="root"></div>' ,
    },*/
    ... tws.reduce(function makeHtmlCB(acc, file){
        return { ... acc, [path.parse(file).name]:  {
            entry: "tw/"+file,
            title: file,
            body: '<div id="root"></div>' ,
        }};
    }, {}),
    // map /vue.html
    "vue":{
        entry: '/src/vuejs/'+prefix+'index.jsx',
        title:"DinnerPlanner Vue", 
        body: '<div id="root"></div>'
    },
    // map /react.html
    "react":{
        entry: '/src/reactjs/'+prefix+'index.jsx',
        title:"DinnerPlanner React", 
        body: '<div id="root"></div>'
    },
    // map /test.html
    "test":{
        entry: 'test/index.js',
        title:"DinnerPlanner tests", 
        body: `<div class="container">   <div id="mocha"></div>   </div> <div id="rendering" style="display:none"></div>` 
    },
};

pages.index= pages.test;

export default defineConfig(function(params){
    const {vue, react}=pages;
    const pg= params.command=="build"?{ vue, react}:pages;
    return {
    plugins: [
        //solidPlugin(),
        vuePlugin(),   // for .vue files
        //vueJsxPlugin(),
        //reactJsxPlugin(),
        nodePolyfills({ protocolImports: true,}),   // needed by mocha
        virtualHtml({pages:pg})      // HTML mappings
    ],
    server: {
        host: "0.0.0.0",
        port: 8080,
    },
    define: {
        USERNAME: JSON.stringify(username),
        TELEMETRY: JSON.stringify(telemetryUserInfo),
        SEMESTER: JSON.stringify(semester),
        TEST_PREFIX: JSON.stringify(prefix),
        __VUE_OPTIONS_API__:JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__:JSON.stringify(true),
    },
    build: {
        target: 'esnext',   // javascript version to target: latest
        chunkSizeWarningLimit: 600,
	minify: false,
	sourcemap:true,
    },
}
					    });
