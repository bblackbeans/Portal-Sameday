export interface NgModelCategory {
    reason?: string;
    status?: string;
    canAdd?: boolean;
    canDelete?: boolean;
    actionApproved?: boolean;
    actionRevision?: boolean;
}

export class NgModelCategoryReset implements NgModelCategory {
    reason = null;
    status = null;
    canAdd = false;
    canDelete = false;
    actionApproved = false;
    actionRevision = false;
}