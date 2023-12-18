/**
 *  Example:
 * tableName: 'Organizations',
    selectConfig: {
        view: 'Hypha published DO NOT EDIT',
        pageSize: 100,
        fields: [
            "Org Name",
            "Publishing Status",
            "Collaboration/ Group",
        ],
    },
 */

export type AirtableSelectConfig = {
    view: string;
    pageSize: number;
    fields: string[];
}

export type AirtableConfig = {
    tableName: string;
    selectConfig: AirtableSelectConfig;
}

export type AirtableFieldTransform<A, B> = (source: A) => B;

export type AirtableFieldMap = {
    from: string;
    to: string;
    transform?: AirtableFieldTransform;
}