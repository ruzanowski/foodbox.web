import {Injectable, OnChanges, SimpleChanges} from '@angular/core';
import {DatesHelper} from '../../../shared/helpers/dates-helper';
import {ItemsService} from '../items-service/items.service';
import {CaloriesDialog} from '../../models/calories-dialog';
import {AdditionalsType, CreateOrderBasketItemDto, OrderBasketItemDto} from '../../../shared/service-proxies/service-proxies';
import {InternalBasketDto} from './internalBasketDto';

@Injectable()
export class BasketService implements OnChanges {
    private basket: InternalBasketDto;

    constructor(private itemsService: ItemsService) {
        this.basket = new InternalBasketDto();
        this.basket.items = [];
    }

    ngOnChanges(changes: SimpleChanges) {
        this.reCalculateTotals();
    }

    add(basketItem: CreateOrderBasketItemDto): void {
        this.basket.items.push(basketItem);
        this.reCalculateTotals();

        const product = this.itemsService.getProduct(basketItem.productId);

        abp.notify.success(
            basketItem.count + 'x ' + product.name,
            'Dodano do koszyka'
        );
    }

    remove(productId: number, count: number, caloriesId: number): void {
        this.basket.items = this.basket.items.filter(
            (x) =>
                x.productId !== productId &&
                x.count !== count &&
                x.caloriesId !== caloriesId
        );
        this.reCalculateTotals();
        abp.notify.error(count + 'x ' + name, 'Usunięto z koszyka');
    }

    //
    // public transformToBasketItem(simpleBasketItem: SimpleBasketItem): CreateOrderBasketItemDto {
    //     return {
    //         name: simpleBasketItem.name,
    //         priceNet: simpleBasketItem.priceNet,
    //         priceGross: simpleBasketItem.priceGross,
    //         taxPercent: simpleBasketItem.taxPercent,
    //         deliveryDates: DatesHelper.getDates(
    //             simpleBasketItem.startDate,
    //             DatesHelper.addDays(
    //                 simpleBasketItem.startDate,
    //                 simpleBasketItem.periodLengthInDays
    //             )
    //         ),
    //         periodLengthInDays: simpleBasketItem.periodLengthInDays,
    //         startDate: simpleBasketItem.startDate,
    //         currency: 'zł',
    //         calories: simpleBasketItem.calories,
    //         datesTableSummary: BasketService.getDatesTableSummary(simpleBasketItem),
    //         quantity: simpleBasketItem.quantity,
    //         deliveryFee: this.itemsService.getDeliveryPrice(simpleBasketItem.name),
    //         discount: this.itemsService.getDiscount(simpleBasketItem.name),
    //         totalItemPrice:
    //             simpleBasketItem.quantity *
    //             simpleBasketItem.priceNet *
    //             (1 - this.itemsService.getDiscount(simpleBasketItem.name)),
    //     };
    // }

    public transformToSimpleBasketItem(calories: CaloriesDialog): CreateOrderBasketItemDto {
        return CreateOrderBasketItemDto.fromJS({
            productId: calories.productId,
            caloriesId: calories.caloriesId,
            count: calories.count,
            cutleryFeeId: 1,
            weekendsIncluded: calories.weekendsIncluded,
            deliveryTimes: DatesHelper.getDates(
                calories.startDate,
                DatesHelper.addDays(
                    calories.startDate,
                    calories.periodLengthInDays
                )
            )
        });
    }

    public get(): InternalBasketDto {
        return this.basket;
    }

    public any(): boolean {
        return this.basket.items?.length > 0;
    }

    //computed fields
    private reCalculateTotals() {
        let discountMultiplier = 1 - this.itemsService.getDiscountIfAny(this.getTotalDays()).value;
        let discountSaves = 0;
        let priceWithDiscountAndFees = 0;

        this.basket.totalPrice = this.basket.items.reduce(
            (sum, current) => {

                const price = (current.count *
                    this.itemsService.getProduct(current.productId).priceGross *
                    current.deliveryTimes.length);

                const priceWithDiscount = price * discountMultiplier;
                priceWithDiscountAndFees += priceWithDiscount;
                discountSaves += price - priceWithDiscount;

                return sum +
                    priceWithDiscount +
                    (this.itemsService.getAdditionalDelivery(undefined)?.valueGross || 0) +
                    (this.itemsService.getAdditionalCutlery(current.cutleryFeeId)?.valueGross || 0);
            },
            0
        );

        this.basket.totalDeliveryPrice = this.basket.items.reduce(
            (sum, current) => sum,
            0
        );

        this.basket.totalDiscounts = discountSaves;
        this.basket.totalPriceWithoutDiscountsAndFees = priceWithDiscountAndFees;
    }


    getTotalDays(): number {
        return this.basket.items.reduce(
            (sum, current) =>
                sum + current.deliveryTimes.length,
            0
        );
    }

    getDatesTableSummary(itemDto: CreateOrderBasketItemDto) {
        return (
            'od ' +
            itemDto.deliveryTimes[0].dateTime.toDate().toLocaleDateString() +
            ' (' +
            BasketService.getPeriodLengthInputDescriptive(
                itemDto.deliveryTimes.length
            ) +
            ')'
        );
    }

    private static getPeriodLengthInputDescriptive(numberOfDays) {
        if (numberOfDays == 1) {
            return '1 d.';
        }

        if (numberOfDays == 5) {
            return '1 tyg.';
        }

        if (numberOfDays == 10) {
            return '2 tyg.';
        }

        if (numberOfDays == 15) {
            return '3 tyg.';
        }

        if (numberOfDays == 20) {
            return '4 tyg.';
        }
    }

    extractTotalItemPrice(itemDto:  OrderBasketItemDto) {
        return itemDto.totalPriceBought;;
    }

    getTotalItemPrice(itemDto:  CreateOrderBasketItemDto) {
        // this does not include discount as this is going to be substracted in the end of the process
        return itemDto.deliveryTimes.length *
            itemDto.count *
            (this.itemsService.getProduct(itemDto.productId).priceGross || 0) +
            (this.itemsService.getAdditionalCutlery(itemDto.cutleryFeeId)?.valueGross || 0) +
            (this.itemsService.getAdditionalDelivery(undefined)?.valueGross || 0);
    }
}

function DaysBetween(StartDate, EndDate) {
    // The number of milliseconds in all UTC days (no DST)
    const oneDay = 1000 * 60 * 60 * 24;

    // A day in UTC always lasts 24 hours (unlike in other time formats)
    const start = Date.UTC(
        EndDate.getFullYear(),
        EndDate.getMonth(),
        EndDate.getDate()
    );
    const end = Date.UTC(
        StartDate.getFullYear(),
        StartDate.getMonth(),
        StartDate.getDate()
    );

    // so it's safe to divide by 24 hours
    return (start - end) / oneDay;
}
