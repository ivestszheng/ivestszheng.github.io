/**
 * 读取 sessionStorage
 * @param key 键名
 * @returns 值或 null
 */
export const getSessionStorage = (key: string): string | null => {
  if (typeof window === 'undefined') return null
  try {
    return sessionStorage.getItem(key)
  } catch (e) {
    console.warn(`[getSessionStorage] Failed to read ${key}:`, e)
    return null
  }
}

/**
 * 设置 sessionStorage
 * @param key 键名
 * @param value 键值
 */
export const setSessionStorage = (key: string, value: string): void => {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(key, value)
  } catch (e) {
    console.warn(`[setSessionStorage] Failed to write ${key}:`, e)
  }
}

/**
 * 文字统计 (中文字符按字数计，英文单词按1个计)
 * @param data 字符串
 * @returns 统计结果
 */
export const countWord = (data: string): number => {
  if (!data) return 0
  // 移除 Markdown 语法干扰（可选，视需求而定）
  const cleanData = data.replace(/!\[.*?\]\(.*?\)|\[.*?\]\(.*?\)|<.*?>/g, '')

  // 匹配中文字符、韩文、日文
  const cjkPattern = /[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]/g
  // 匹配英文单词、数字
  const wordPattern = /[a-zA-Z0-9_\u00C0-\u00FF]+/g

  const cjkMatches = cleanData.match(cjkPattern) || []
  const wordMatches = cleanData.match(wordPattern) || []

  return cjkMatches.length + wordMatches.length
}

/**
 * 数字千分位转换 1500 -> 1.5K，1500000 -> 1.5M
 * @param count 数字
 * @returns 格式化后的字符串
 */
export const countTransK = (count: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(count)
}

/**
 * 将数字转化为千分位逗号分隔格式
 * @param num 数字
 * @returns 格式化后的字符串
 */
export const numberWithCommas = (num: number): string => {
  return num.toLocaleString('en-US')
}

/* #region format-date */
/**
 * 日期格式化程序
 * @param hasTime 是否包含时间
 * @returns Intl.DateTimeFormat 实例
 */
export const formatDate = (hasTime = false): Intl.DateTimeFormat => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...(hasTime && {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }
  return new Intl.DateTimeFormat('zh-CN', options)
}
/* #endregion format-date */