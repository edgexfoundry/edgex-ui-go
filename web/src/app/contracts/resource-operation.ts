export interface ResourceOperation {
    index: string,
    operation: string,
    object: string, // Deprecated
    deviceResource: string // The replacement of Object field
    parameter: string,
    resource: string, // Deprecated
    deviceCommand: string // The replacement of Resource field
    secondary: string,
    mappings: any
}
