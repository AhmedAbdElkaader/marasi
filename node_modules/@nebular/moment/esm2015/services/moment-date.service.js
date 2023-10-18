/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { TranslationWidth } from '@angular/common';
import { NbDateService } from '@nebular/theme';
import * as _moment from 'moment';
// @ts-ignore
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
let NbMomentDateService = class NbMomentDateService extends NbDateService {
    constructor(locale) {
        super();
        this.setLocale(locale);
    }
    setLocale(locale) {
        super.setLocale(locale);
        this.setMomentLocaleData(locale);
    }
    addDay(date, days) {
        return this.clone(date).add({ days });
    }
    addMonth(date, months) {
        return this.clone(date).add({ months });
    }
    addYear(date, years) {
        return this.clone(date).add({ years });
    }
    clone(date) {
        return date.clone().locale(this.locale);
    }
    compareDates(date1, date2) {
        return this.getYear(date1) - this.getYear(date2) ||
            this.getMonth(date1) - this.getMonth(date2) ||
            this.getDate(date1) - this.getDate(date2);
    }
    createDate(year, month, date) {
        return moment([year, month, date]);
    }
    format(date, format) {
        if (date) {
            return date.format(format || this.localeData.defaultFormat);
        }
        return '';
    }
    getDate(date) {
        return this.clone(date).date();
    }
    getDayOfWeek(date) {
        return this.clone(date).day();
    }
    getDayOfWeekNames(style = TranslationWidth.Narrow) {
        return this.localeData.days[style];
    }
    getFirstDayOfWeek() {
        return this.localeData.firstDayOfWeek;
    }
    getMonth(date) {
        return this.clone(date).month();
    }
    getMonthEnd(date) {
        return this.clone(date).endOf('month');
    }
    getMonthName(date, style = TranslationWidth.Abbreviated) {
        const month = this.getMonth(date);
        return this.getMonthNameByIndex(month, style);
    }
    getMonthNameByIndex(month, style = TranslationWidth.Abbreviated) {
        return this.localeData.months[style][month];
    }
    getMonthStart(date) {
        return this.clone(date).startOf('month');
    }
    getNumberOfDaysInMonth(date) {
        return this.clone(date).daysInMonth();
    }
    getYear(date) {
        return this.clone(date).year();
    }
    getYearEnd(date) {
        return this.clone(date).endOf('year');
    }
    getYearStart(date) {
        return this.clone(date).startOf('year');
    }
    isSameDay(date1, date2) {
        return this.isSameMonth(date1, date2) && this.getDate(date1) === this.getDate(date2);
    }
    isSameMonth(date1, date2) {
        return this.isSameYear(date1, date2) && this.getMonth(date1) === this.getMonth(date2);
    }
    isSameYear(date1, date2) {
        return this.getYear(date1) === this.getYear(date2);
    }
    isValidDateString(date, format) {
        return moment(date, format).isValid();
    }
    parse(date, format) {
        return moment(date, format);
    }
    today() {
        return moment();
    }
    getId() {
        return 'moment';
    }
    setMomentLocaleData(locale) {
        const momentLocaleData = moment.localeData(locale);
        this.localeData = {
            firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
            defaultFormat: momentLocaleData.longDateFormat('L'),
            months: {
                [TranslationWidth.Abbreviated]: momentLocaleData.monthsShort(),
                [TranslationWidth.Wide]: momentLocaleData.months(),
            },
            days: {
                [TranslationWidth.Wide]: momentLocaleData.weekdays(),
                [TranslationWidth.Short]: momentLocaleData.weekdaysShort(),
                [TranslationWidth.Narrow]: momentLocaleData.weekdaysMin(),
            },
        };
    }
    getWeekNumber(date) {
        return date.week();
    }
};
NbMomentDateService = __decorate([
    Injectable(),
    __param(0, Inject(LOCALE_ID)),
    __metadata("design:paramtypes", [String])
], NbMomentDateService);
export { NbMomentDateService };
//# sourceMappingURL=moment-date.service.js.map