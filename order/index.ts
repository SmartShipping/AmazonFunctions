import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { decryptData } from "../utils/index";
import { OrderAmazon } from "../types/OrderAmazon";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const name = req.query.name || (req.body && req.body.name);

  const payload = JSON.parse(decryptData(req.body as string));
  if (payload) {
    const OracleOrderObject = generateAmazonOrderObject(payload);
    const headers = new Headers();
    headers.append("Authorization", `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_BLOCKCHAIN_API_KEY}:`).toString("base64")}`);
    headers.append("Content-Type", "application/json");

    const response = await fetch(`${process.env.BLOCKCHAIN_API_URL}/orders`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(OracleOrderObject),
    });

    const OracleResponse: any = await response.json();

    if (OracleResponse._type === "error") {
      return OracleResponse._type;
    } else {
      // status: 200, /* Defaults to 200 */
      return context.res.status(201).json(response);
    }
  } else {
    // status: 200, /* Defaults to 200 */
    return context.res.status(401).json();
  }
};
const generateAmazonOrderObject = (payload: any): OrderAmazon | null => {
  try {
    return {
      idempotency_key: payload.orderId,
      retailer: "amazon",
      addax: true,
      products: payload.items,
      max_price: 0,
      shipping_address: {
        first_name: payload.shippingInfo.firstName,
        last_name: payload.shippingInfo.lastName,
        address_line1: payload.shippingInfo.addressLine1,
        address_line2: payload.shippingInfo.addressLine2,
        zip_code: payload.shippingInfo.zipCode,
        city: payload.shippingInfo.city,
        state: payload.shippingInfo.state,
        country: "US",
        phone_number: payload.shippingInfo.phoneNumber,
      },
      shipping: {
        order_by: "price",
        max_days: 10,
        max_price: 1000,
      },
      is_gift: false,
    };
  } catch {
    return null;
  }
};
export default httpTrigger;
