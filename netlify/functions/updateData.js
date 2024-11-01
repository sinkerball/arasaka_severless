// updateData.js

exports.handler = async (event, context) => {
    if (event.httpMethod === "POST") {
        const data = JSON.parse(event.body);

        // 받은 데이터에 대한 처리를 여기에 추가할 수 있습니다.
        console.log("Received data:", data);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Data received", data: data })
        };
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method not allowed" })
        };
    }
};
