export interface TotalsOrders {
    statusAll?: Number;
    statusPending?: Number;
    statusCanceled?: Number;
    statusFinished?: Number;
    statusExecution?: Number;
}

export class TotalsOrdersReset implements TotalsOrders {
    statusAll = 0;
    statusPending = 0;
    statusCanceled = 0;
    statusFinished = 0;
    statusExecution = 0;
}