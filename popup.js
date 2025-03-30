document.getElementById("analyzeBtn").addEventListener("click", async () => {
    // content.js에 텍스트 요청
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getPageText,
    }, async (results) => {
      const text = results[0].result;
  
      // 요약
      const summary = await summarizeText(text);
      document.getElementById("summary").innerText = summary;
  
      // 감정 분석
      const sentiments = await analyzeSentiment(summary);
      drawChart(sentiments);
    });
  });
  
  // 페이지 텍스트 추출 함수 (content.js에서 실행됨)
  function getPageText() {
    return document.body.innerText;
  }
  
  // GPT API 연동 함수들
  async function summarizeText(text) {
    const res = await fetch("./utils/summarize.js"); // 나중에 fetch 방식 교체 필요
    return "요약된 텍스트 예시"; // 임시
  }
  
  async function analyzeSentiment(text) {
    return { 긍정: 60, 중립: 30, 부정: 10 }; // 임시
  }
  
  function drawChart(data) {
    const ctx = document.getElementById("sentimentChart");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(data),
        datasets: [{
          data: Object.values(data),
          backgroundColor: ["green", "gray", "red"],
        }]
      }
    });
  }
  