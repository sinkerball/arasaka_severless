// updateData.js

// 메모리에 최신 데이터 저장
let latestData = {
    status: "정상",
    rssi: -75,
    buzzer: false,
    lastUpdate: Date.now()
};

exports.handler = async (event, context) => {
    // CORS 헤더 추가
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    try {
        // GET 요청 처리 (웹 앱에서 데이터 요청)
        if (event.httpMethod === "GET") {
            // 마지막으로 저장된 데이터 반환
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(latestData)
            };
        }
        
        // POST 요청 처리 (ESP32에서 데이터 전송)
        if (event.httpMethod === "POST") {
            const data = JSON.parse(event.body);
            
            // 새로운 데이터로 업데이트
            latestData = {
                ...latestData,         // 기존 데이터 유지
                ...data,               // 새로운 데이터로 덮어쓰기
                lastUpdate: Date.now() // 타임스탬프 업데이트
            };

            console.log("Updated data:", latestData);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    message: "Data received",
                    data: latestData,
                    buzzer: latestData.buzzer // ESP32로 부저 상태 반환
                })
            };
        }

        // 다른 HTTP 메서드는 거부
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ message: "Method not allowed" })
        };

    } catch (error) {
        console.error("Error processing request:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                message: "Internal server error",
                error: error.message
            })
        };
    }
};
