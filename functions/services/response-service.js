const admin = require("firebase-admin");

const COLLECTION_RESPONSES = "responses";

class ResponseService {
  static async createResponse(data) {
    const db = admin.firestore;
    const { name, mobile, isWinner, group } = data;
    const responseData = await db().collection(COLLECTION_RESPONSES).add({
      createdAt: db.Timestamp.now(),
      name,
      mobile,
      isWinner,
      group,
    });
    return responseData.id;
  }

  static async fetchAllResponses() {
    const db = admin.firestore;
    const ordersRef = db().collection(COLLECTION_RESPONSES);
    const queryResult = await ordersRef.orderBy("name").get();
    return queryResult.docs.map((item) => {
      return { ...item.data() };
    });
  }
}

module.exports.ResponseService = ResponseService;
