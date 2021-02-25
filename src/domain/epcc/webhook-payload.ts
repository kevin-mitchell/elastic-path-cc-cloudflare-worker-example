import { Order, OrderItem } from "@moltin/sdk";

export interface WebhookPayload<T> {

    id:            string;
    triggered_by:  string;
    attempt:       number;
    integration:   Integration;
    resources:     string;
    payload:       T;
    configuration: Configuration;
}

export interface OrderEvent {
    data:           Order;
    included:       OrderEventItems;
}

export interface OrderEventItems {
    items: OrderItem[];
}

export interface Configuration {
    secret_key: string;
    url:        string;
}

export interface Integration {
    id:               string;
    integration_type: string;
    name:             string;
    description:      string;
}
