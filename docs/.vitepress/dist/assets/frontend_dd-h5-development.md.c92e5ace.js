import{_ as s,c as a,o as n,a as l}from"./app.d731b6d6.js";const h='{"title":"\u9489\u9489H5\u5FAE\u5E94\u7528\u5F00\u53D1","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u9879\u76EE\u6982\u8FF0","slug":"\u9879\u76EE\u6982\u8FF0"},{"level":3,"title":"1.  \u80CC\u666F","slug":"_1-\u80CC\u666F"},{"level":3,"title":"2 .\u6280\u672F\u6808","slug":"_2-\u6280\u672F\u6808"},{"level":2,"title":"\u51C6\u5907\u5DE5\u4F5C","slug":"\u51C6\u5907\u5DE5\u4F5C"},{"level":2,"title":"H5\u5FAE\u5E94\u7528\u4E0E\u5C0F\u7A0B\u5E8F\u7684\u5F02\u540C\u4E4B\u5904","slug":"h5\u5FAE\u5E94\u7528\u4E0E\u5C0F\u7A0B\u5E8F\u7684\u5F02\u540C\u4E4B\u5904"},{"level":2,"title":"\u9879\u76EE\u6784\u5EFA","slug":"\u9879\u76EE\u6784\u5EFA"},{"level":2,"title":"\u521B\u5EFA\u5FAE\u5E94\u7528\u4EE5\u53CA\u53D1\u5E03","slug":"\u521B\u5EFA\u5FAE\u5E94\u7528\u4EE5\u53CA\u53D1\u5E03"},{"level":2,"title":"\u8E29\u5751","slug":"\u8E29\u5751"},{"level":2,"title":"\u5173\u4E8E\u8C03\u8BD5","slug":"\u5173\u4E8E\u8C03\u8BD5"},{"level":2,"title":"Ding JSAPI","slug":"ding-jsapi"},{"level":3,"title":"1.\u4F7F\u7528npm\u5B89\u88C5","slug":"_1-\u4F7F\u7528npm\u5B89\u88C5"},{"level":3,"title":"2.main\u6302\u8F7D","slug":"_2-main\u6302\u8F7D"},{"level":3,"title":"3.\u9875\u9762\u4E2D\u8C03\u7528","slug":"_3-\u9875\u9762\u4E2D\u8C03\u7528"},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3"}],"relativePath":"frontend/dd-h5-development.md"}',e={name:"frontend/dd-h5-development.md"},p=l(`<h1 id="\u9489\u9489h5\u5FAE\u5E94\u7528\u5F00\u53D1" tabindex="-1">\u9489\u9489H5\u5FAE\u5E94\u7528\u5F00\u53D1 <a class="header-anchor" href="#\u9489\u9489h5\u5FAE\u5E94\u7528\u5F00\u53D1" aria-hidden="true">#</a></h1><h2 id="\u9879\u76EE\u6982\u8FF0" tabindex="-1">\u9879\u76EE\u6982\u8FF0 <a class="header-anchor" href="#\u9879\u76EE\u6982\u8FF0" aria-hidden="true">#</a></h2><h3 id="_1-\u80CC\u666F" tabindex="-1">1. \u80CC\u666F <a class="header-anchor" href="#_1-\u80CC\u666F" aria-hidden="true">#</a></h3><p>6\u6708\u4E2D\u65EC\u5165\u804C\u676D\u5DDE\u4E00\u5BB6\u653F\u4F01\u5408\u4F5C\u5355\u4F4D\u5355\u4F4D\uFF0C\u4ECE\u96F6\u5F00\u53D1\u4E00\u4E2A H5 \u4F1A\u8BAE\u5BA4\u6392\u5EA7\u7CFB\u7EDF\u3002\u81F38\u6708\u521D\u5B8C\u6210\u57FA\u672C\u529F\u80FD\u540E\uFF0C\u9700\u8981\u5F00\u53D1\u4E00\u4E2A\u79FB\u52A8\u7AEF\u7528\u4E8E\u7BA1\u7406\u3002\u672C\u9879\u76EE\u5F00\u53D1\u65B9\u5F0F\u91C7\u7528<strong>\u4F01\u4E1A\u5185\u90E8\u5F00\u53D1</strong>\uFF0C\u672C\u6587\u4E3B\u9610\u8FF0\u524D\u7AEF\u90E8\u5206\u7684\u5185\u5BB9\u3002</p><h3 id="_2-\u6280\u672F\u6808" tabindex="-1">2 .\u6280\u672F\u6808 <a class="header-anchor" href="#_2-\u6280\u672F\u6808" aria-hidden="true">#</a></h3><p>Vue \u5168\u5BB6\u6876 + VantUI</p><h2 id="\u51C6\u5907\u5DE5\u4F5C" tabindex="-1">\u51C6\u5907\u5DE5\u4F5C <a class="header-anchor" href="#\u51C6\u5907\u5DE5\u4F5C" aria-hidden="true">#</a></h2><p>\u786E\u4FDD\u5DF2\u7ECF\u5B8C\u6210\u9489\u9489\u5F00\u53D1\u8005\u7684\u6CE8\u518C\u4E0E\u6FC0\u6D3B\u5E76\u62E5\u6709\u4E86\u5B50\u7BA1\u7406\u5458\u548C\u5F00\u53D1\u8005\u6743\u9650\u3002\u82E5\u5C1A\u672A\u5B8C\u6210\uFF0C\u8BF7\u53C2\u8003<a href="https://developers.dingtalk.com/document/app/become-a-dingtalk-developer#topic-2024337" target="_blank" rel="noopener noreferrer">\u6210\u4E3A\u9489\u9489\u5F00\u53D1\u8005</a>\u3002</p><h2 id="h5\u5FAE\u5E94\u7528\u4E0E\u5C0F\u7A0B\u5E8F\u7684\u5F02\u540C\u4E4B\u5904" tabindex="-1">H5\u5FAE\u5E94\u7528\u4E0E\u5C0F\u7A0B\u5E8F\u7684\u5F02\u540C\u4E4B\u5904 <a class="header-anchor" href="#h5\u5FAE\u5E94\u7528\u4E0E\u5C0F\u7A0B\u5E8F\u7684\u5F02\u540C\u4E4B\u5904" aria-hidden="true">#</a></h2><p>\u4E00\u5F00\u59CB\u7EA0\u7ED3\u662F\u505A\u5C0F\u7A0B\u5E8F\u8FD8\u662F H5 \u5FAE\u5E94\u7528\uFF0C\u6211\u53BB\u7F51\u4E0A\u67E5\u627E\u8D44\u6599\u627E\u5230\u4E0B\u9762\u8FD9\u5F20\u56FE\u3002\u6761\u4EF6\u5145\u8DB3\u7684\u8BDD\u66F4\u52A0\u63A8\u8350\u5C0F\u7A0B\u5E8F\u5F00\u53D1\uFF0C\u4F53\u9A8C\u66F4\u597D\uFF0C\u6709\u4E13\u95E8\u7684 IDE\uFF0C\u8C03\u8BD5\u4E5F\u65B9\u4FBF\u3002\u800C\u6211\u4E4B\u6240\u4EE5\u9009\u62E9 H5 \u5FAE\u5E94\u7528\u5F00\u53D1\u7684\u539F\u56E0\u662F\u5F00\u53D1\u5468\u671F\u77ED\uFF0C\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u7ECF\u9A8C\u4E0D\u8DB3\u3002</p><p><img src="https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20210922150619.png" alt="APP\u3001\u5C0F\u7A0B\u5E8F\u3001H5 \u4E09\u8005\u6BD4\u8F83"></p><h2 id="\u9879\u76EE\u6784\u5EFA" tabindex="-1">\u9879\u76EE\u6784\u5EFA <a class="header-anchor" href="#\u9879\u76EE\u6784\u5EFA" aria-hidden="true">#</a></h2><p>\u7531\u4E8E\u662F\u6211\u4E2A\u4EBA\u6784\u5EFA\uFF0C\u6240\u4EE5\u6211\u4E0D\u6015\u6B7B\u5730\u9009\u62E9 Vue3\uFF0C\u4E0D\u5F97\u4E0D\u8BF4 Vite \u70ED\u66F4\u65B0\u662F\u771F\u7684\u5FEB\u3002\u53E6\u5916\u8FD9\u8FB9\u5F3A\u70C8\u63A8\u8350\u53BB\u770B<a href="https://juejin.cn/post/6951649464637636622" target="_blank" rel="noopener noreferrer">\u300A\u4ECE 0 \u5F00\u59CB\u624B\u628A\u624B\u5E26\u4F60\u642D\u5EFA\u4E00\u5957\u89C4\u8303\u7684 Vue3.x \u9879\u76EE\u5DE5\u7A0B\u73AF\u5883\u300B</a>\uFF0C\u8FD9\u7BC7\u6587\u7AE0\u5BF9\u6211\u8D77\u4E86\u5F88\u5927\u7684\u5E2E\u52A9\u3002\u9879\u76EE\u6784\u5EFA\u597D\u4E4B\u540E\u5C31\u53EF\u4EE5\u6253\u5305\u4E22\u5230\u670D\u52A1\u5668\u4E0A\u4E86\uFF0C\u4E4B\u540E\u6D4B\u8BD5\u8981\u7528\u3002</p><h2 id="\u521B\u5EFA\u5FAE\u5E94\u7528\u4EE5\u53CA\u53D1\u5E03" tabindex="-1">\u521B\u5EFA\u5FAE\u5E94\u7528\u4EE5\u53CA\u53D1\u5E03 <a class="header-anchor" href="#\u521B\u5EFA\u5FAE\u5E94\u7528\u4EE5\u53CA\u53D1\u5E03" aria-hidden="true">#</a></h2><p>\u8FD9\u90E8\u5206\u5185\u5BB9<a href="https://developers.dingtalk.com/document/tutorial/develop-h5-micro-applications?spm=ding_open_doc.21783679.J_5712166950.3.3de54ce9E2WTeh" target="_blank" rel="noopener noreferrer">\u9489\u9489\u5F00\u653E\u5E73\u53F0\u6559\u7A0B</a>\u8DB3\u591F\u8BE6\u7EC6\uFF0C\u4E3B\u8981\u770B<strong>\u521B\u5EFA\u5E94\u7528</strong>\u53CA<strong>\u53D1\u5E03 H5 \u5FAE\u5E94\u7528</strong>\u3002</p><p>\u53E6\u5916\uFF0C\u5982\u679C\u8981\u5728 PC \u4E0A\u8FDB\u884C\u4F7F\u7528\u7684\u8BDD\uFF0C<code>\u5F00\u53D1\u7BA1\u7406 &gt; PC\u7AEF\u9996\u9875\u5730\u5740</code>\u4E5F\u8981\u586B\u3002</p><h2 id="\u8E29\u5751" tabindex="-1">\u8E29\u5751 <a class="header-anchor" href="#\u8E29\u5751" aria-hidden="true">#</a></h2><p>\u5C3D\u7BA1\u6211\u67E5\u627E\u8D44\u6599\u53D1\u73B0\u4F7F\u7528\u9489\u9489\u7528\u7684\u662F webkit \u5185\u6838\uFF0C\u4F46\u662F\u603B\u6709\u5947\u5947\u602A\u602A\u7684\u8868\u73B0\u3002</p><ol><li>svg \u56FE\u7247\u65E0\u6CD5\u663E\u793A\u3002</li><li>\u4E0D\u8981\u4F7F\u7528 rem \u4F5C\u4E3A\u5355\u4F4D\uFF0C\u6D4F\u89C8\u5668\u4E2D\u6B63\u5E38\u7684\u9875\u9762\u5230 H5 \u5FAE\u5E94\u7528\u4E2D\u4F1A\u4E71\uFF08\u8FD9\u4E5F\u53EF\u80FD\u662F\u7531\u4E8E\u6211\u4F7F\u7528\u81EA\u9002\u5E94 REM \u5E03\u5C40\u7684\u5173\u7CFB\uFF09\u3002</li><li>\u9876\u90E8\u5BFC\u822A\u680F\u59CB\u7EC8\u5B58\u5728\uFF0C\u4EC5\u5728\u901A\u8FC7 JSAPI \u8FDB\u884C\u65CB\u8F6C\u5C4F\u5E55\u65F6\u4F1A\u9690\u85CF\u3002\u6B63\u5E38\u72B6\u6001\u4E0B\u4EC5\u80FD\u8BBE\u7F6E\u6807\u9898\u4EE5\u53CA\u5DE6\u53F3\u6309\u94AE\uFF0C\u5728 UI \u8BBE\u8BA1\u65F6\u8981\u548C\u63D0\u524D\u6C9F\u901A\u597D\u3002</li><li>\u4E0D\u8981\u4F7F\u7528\u5916\u90E8\u5B57\u4F53\u8D44\u6E90\uFF0C\u52A0\u8F7D\u901F\u5EA6\u975E\u5E38\u4E4B\u6162\u3002</li></ol><h2 id="\u5173\u4E8E\u8C03\u8BD5" tabindex="-1">\u5173\u4E8E\u8C03\u8BD5 <a class="header-anchor" href="#\u5173\u4E8E\u8C03\u8BD5" aria-hidden="true">#</a></h2><p>\u9489\u9489 H5 \u5FAE\u5E94\u7528\u8C03\u8BD5\u771F\u662F\u5FC3\u7D2F\uFF0C\u6240\u4EE5\u518D\u5F3A\u8C03\u4E00\u6B21\u6709\u6761\u4EF6\u9009\u62E9\u5C0F\u7A0B\u5E8F\u5F00\u53D1\uFF0C\u8BE6\u60C5\u53EF\u89C1<a href="https://developers.dingtalk.com/document/resourcedownload/h5-debug" target="_blank" rel="noopener noreferrer">\u5FAE\u5E94\u7528\u8C03\u8BD5\u5DE5\u5177</a>\u3002</p><p>\u7B80\u5355\u6765\u8BF4\uFF0C\u5171\u4E24\u4E2A\u8C03\u8BD5\u5DE5\u5177\uFF0CRC \u7248\u548C\u7F51\u9875\u7248\uFF0CRC \u7248\u8C03\u8BD5\u5305\u5982\u4E0B\uFF1A</p><table><thead><tr><th>\u5FAE\u5E94\u7528</th><th>Android/Windows</th><th>iOS/Mac</th></tr></thead><tbody><tr><td>\u79FB\u52A8\u7AEF\u5FAE\u5E94\u7528\u8C03\u8BD5</td><td>Android\u8C03\u8BD5\u5305: <a href="https://download.alicdn.com/wireless/dingtalk/latest/rimet_10006337.apk" target="_blank" rel="noopener noreferrer">https://download.alicdn.com/wireless/dingtalk/latest/rimet_10006337.apk</a></td><td>\u6682\u65E0</td></tr><tr><td>PC\u7AEF\u5FAE\u5E94\u7528\u8C03\u8BD5</td><td>Windows\u8C03\u8BD5\u5305\uFF1A<a href="https://download.alicdn.com/dingtalk-desktop/win_installer/RC/DingTalk_v5.5.5-RC.5605.exe" target="_blank" rel="noopener noreferrer">https://download.alicdn.com/dingtalk-desktop/win_installer/RC/DingTalk_v5.5.5-RC.5605.exe</a></td><td>\u6682\u65E0</td></tr></tbody></table><p>\u8FD9\u91CC\u6709\u4E2A\u95EE\u9898\uFF0C\u6211\u4E0B\u8F7D\u5B89\u5353\u7684\u8C03\u8BD5\u5305\u65E0\u6CD5\u5B89\u88C5\uFF0C\u4E0D\u77E5\u9053\u662F\u56E0\u4E3A\u4E00\u52A0\u624B\u673A\u8FD8\u662F\u5B89\u535311\u7684\u7F18\u6545\u3002Windows \u7684\u8C03\u8BD5\u5305\u53EF\u4EE5\u7528\uFF0C\u529F\u80FD\u7C7B\u4F3CChrome devtools\uFF0C\u4F46\u662F\u79FB\u52A8\u7AEF\u7684 JSAPI \u65E0\u6CD5\u8C03\u8BD5,Chrome devtools \u540C\u6837\u5730\u56E0\u4E3A\u7F3A\u4E4F Dingtalk \u7684\u73AF\u5883\u800C\u65E0\u6CD5\u8C03\u8BD5 API\u3002</p><p><img src="https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20210922162432.jpg" alt="RC \u5B89\u5353\u7248\u5B89\u88C5\u5931\u8D25"></p><p>\u7F51\u9875\u7248\u53EF\u80FD\u53EF\u4EE5\u89E3\u51B3\u79FB\u52A8\u7AEF\u8C03\u8BD5\u7684\u95EE\u9898\uFF0C\u5B98\u65B9\u4EBA\u5458\u597D\u50CF\u4E5F\u53EA\u63A8\u8350\u8FD9\u79CD\u65B9\u6CD5\u8FDB\u884C\u8C03\u8BD5\uFF0C\u5177\u4F53\u6211\u5728\u4F7F\u7528\u8FC7\u540E\u518D\u66F4\u65B0\u3002</p><h2 id="ding-jsapi" tabindex="-1">Ding JSAPI <a class="header-anchor" href="#ding-jsapi" aria-hidden="true">#</a></h2><p>\u5728\u8FDB\u884C\u5F00\u53D1\u4E4B\u524D\uFF0C\u53EF\u4EE5\u5148\u5728 <a href="https://open-dev.dingtalk.com/apiExplorer?spm=ding_open_doc.document.0.0.4f077391x9mSSu#/jsapi?api=biz.util.multiSelect" target="_blank" rel="noopener noreferrer">JSAPI Explorer</a> \u4F53\u9A8C\u524D\u7AEF JSAPI \u529F\u80FD\u3002</p><p>\u5BF9\u4E8E\u4E00\u4E9B\u9489\u9489\u4E1A\u52A1\u3001\u5B89\u5168\u76F8\u5173\u7684JSAPI\u7684\u8C03\u7528\uFF0C\u9700\u8981\u5148\u9274\u6743\uFF0C\u7136\u540E\u518D\u8C03\u7528\u3002\u5982\u679C\u53EA\u662F\u7528\u8C03\u7528\u624B\u673A\u7684\u57FA\u7840\u80FD\u529B\u662F\u65E0\u9700\u8FDB\u884C\u9274\u6743\u76F8\u5173\u914D\u7F6E\u7684\uFF0C\u5EFA\u8BAE\u9700\u8981\u65F6\u518D\u914D\u7F6E\u9274\u6743\u3002</p><p>\u4E0B\u9762\u5C06\u8BB2\u8FF0\u5982\u4F55\u5728 Vue \u4E2D\u914D\u7F6E\u5E76\u4F7F\u7528 JSAPI\uFF0C\u5E76\u4EE5\u8BBE\u7F6E\u5BFC\u822A\u680F\u53F3\u4FA7\u6309\u94AE\u4E3A\u4F8B\u3002</p><h3 id="_1-\u4F7F\u7528npm\u5B89\u88C5" tabindex="-1">1.\u4F7F\u7528npm\u5B89\u88C5 <a class="header-anchor" href="#_1-\u4F7F\u7528npm\u5B89\u88C5" aria-hidden="true">#</a></h3><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">npm install dingtalk-jsapi --save</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-main\u6302\u8F7D" tabindex="-1">2.main\u6302\u8F7D <a class="header-anchor" href="#_2-main\u6302\u8F7D" aria-hidden="true">#</a></h3><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;">// Vue3\u5199\u6CD5\uFF0CVue2 \u76F4\u63A5\u6302\u8F7D\u5230\u539F\u578B\u94FE\u6211\u60F3\u5E94\u8BE5\u4E5F\u662F\u53EF\u4EE5\u7684</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> dd </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">dingtalk-jsapi</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">config</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">globalProperties</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">$dd </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> dd</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h3 id="_3-\u9875\u9762\u4E2D\u8C03\u7528" tabindex="-1">3.\u9875\u9762\u4E2D\u8C03\u7528 <a class="header-anchor" href="#_3-\u9875\u9762\u4E2D\u8C03\u7528" aria-hidden="true">#</a></h3><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> THIS </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">this</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$dd</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">env</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">platform </span><span style="color:#89DDFF;">!==</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">notInDingTalk</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$dd</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">biz</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">navigation</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setRight</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        show</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        control</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        text</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u6D4B\u8BD5</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">onSuccess</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#676E95;font-style:italic;">// \u8C03\u7528\u6210\u529F\u65F6\u56DE\u8C03</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#A6ACCD;">THIS</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">xxx</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u7531\u4E8E\u8BBE\u7F6E\u5BFC\u822A\u680F\u53EA\u6709\u5728\u9489\u9489\u79FB\u52A8\u7AEF\u73AF\u5883\u4E2D\u624D\u80FD\u4F7F\u7528\uFF0C\u52A0\u4E0A<code>this.$dd.env.platform !== &quot;notInDingTalk&quot;</code>\u5224\u65AD\u9632\u6B62\u62A5\u9519\u3002Vue3 \u4E2D setup() \u8C03\u7528\u5199\u6CD5\u5982\u4E0B\uFF1A</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">getCurrentInstance</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">setup</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">proxy</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">getCurrentInstance</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">proxy</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">$dd</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">env</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">platform</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">notInDingTalk</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">proxy</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">$dd</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">biz</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">navigation</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setRight</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        show</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        control</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        text</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u6D4B\u8BD5</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">onSuccess</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#676E95;font-style:italic;">// \u8C03\u7528\u6210\u529F\u65F6\u56DE\u8C03</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u8FD9\u91CC\u4E0D\u8981\u4F7F\u7528 ctx \uFF0C\u5426\u5219\u5728\u751F\u4EA7\u73AF\u5883\u4E2D\u7684\u6307\u5411\u4F1A\u9519\u8BEF\u3002</p><h2 id="\u603B\u7ED3" tabindex="-1">\u603B\u7ED3 <a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a></h2><p>H5 \u5FAE\u5E94\u7528\u9002\u5408\u8DE8\u5E73\u53F0\uFF0C\u5F00\u53D1\u5468\u671F\u77ED\uFF0C\u5F00\u53D1\u8005\u7F3A\u5C11\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u7ECF\u9A8C\u7684\u60C5\u51B5\u4E0B\u4F7F\u7528\u3002\u53E6\u5916\u5173\u4E8E JSAPI \u7684\u4F7F\u7528\u65B9\u6CD5\uFF0C\u6211\u4F1A\u5728\u4E4B\u540E\u8FDB\u884C\u66F4\u65B0\u3002</p>`,41),o=[p];function t(r,c,i,F,D,y){return n(),a("div",null,o)}var A=s(e,[["render",t]]);export{h as __pageData,A as default};