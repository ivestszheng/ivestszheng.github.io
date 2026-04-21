/**
 * 网站访问量统计
 *
 * https://cn.vercount.one/
 */
export const loadVercountScript = () => {
    const script = document.createElement('script')
    script.defer = true
    script.async = true
    // 调用 Vercount 接口
    script.src = 'https://cn.vercount.one/js'
    document.head.appendChild(script)
}

export const sendBaiduAnalyticsPageView = (to: string) => {
    if (typeof window._hmt !== 'undefined') {
        window._hmt.push(['_trackPageview', to]);
    }
}

export const sendGoogleAnalyticsPageView = (to: string) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('config', 'G-GC7S2GFJS1', {
            page_path: to,
            send_page_view: true
        });
    }
}