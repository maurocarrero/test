/**
 * Created by maurocarrero on 26/05/16.
 */
'use strict';

describe('Filter: dateFormat', function () {

  var dff = null; // stands for dateFormat filter

  var YEAR = 2016;
  var MONTH = 4;
  var DAY = 27;
  var HOUR = 5;
  var MINUTE = 27;

  beforeEach(module('filters'));

  beforeEach(inject(function ($filter) {
    dff = $filter('dateFormat');
    jasmine.clock().mockDate(new Date(YEAR, MONTH, DAY, HOUR, MINUTE));
  }));

  it('should return "Invalid date" when the date is not valid', function (){
    expect(dff('')).toBe('Invalid date');
    expect(dff(null)).toBe('Invalid date');
    expect(dff(undefined)).toBe('Invalid date');
    expect(dff('A random string')).toBe('Invalid date');
    expect(dff(true)).toBe('Invalid date');
    expect(dff(false)).toBe('Invalid date');
  });

  describe('[Minutes]', function () {
    it('should return "1 minute ago" if the comments date diff is equal or less than 60 seconds', function () {
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 26, 30))).toBe('1 minute ago');
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 26, 10))).toBe('1 minute ago');
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 26, 1))).toBe('1 minute ago');
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 26))).toBe('1 minute ago');
    });

    it('should return "1 minute ago" as well, if the comments date diff is greater than a minute but lower than 2 minutes', function () {
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 26))).toBe('1 minute ago');
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 25, 30))).toBe('1 minute ago');
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 25, 1))).toBe('1 minute ago');
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 25))).not.toBe('1 minute ago');
    });

    it('should return "2 minutes ago"', function () {
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 25))).toBe('2 minutes ago');
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 24, 30))).toBe('2 minutes ago');
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 24, 1))).toBe('2 minutes ago');
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 24))).not.toBe('2 minutes ago');
    });

    it('should return "3 minutes ago"', function () {
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 24))).toBe('3 minutes ago');
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 23, 20))).toBe('3 minutes ago');
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 23, 1))).toBe('3 minutes ago');
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR, 23))).not.toBe('3 minutes ago');
    });

    it('should return "27 minutes ago"', function () {
      expect(dff(new Date(YEAR, MONTH, DAY, HOUR))).toBe('27 minutes ago');
    });

    it('should return "37 minutes ago"', function () {
      expect(dff(new Date(YEAR, MONTH, DAY, 4, 50))).toBe('37 minutes ago');
    });

    it('should return "59 minutes ago"', function () {
      expect(dff(new Date(YEAR, MONTH, DAY, 4, 28))).toBe('59 minutes ago');
      expect(dff(new Date(YEAR, MONTH, DAY, 4, MINUTE, 30))).toBe('59 minutes ago');
      expect(dff(new Date(YEAR, MONTH, DAY, 4, MINUTE, 1))).toBe('59 minutes ago');
      expect(dff(new Date(YEAR, MONTH, DAY, 4, MINUTE))).not.toBe('59 minutes ago');
    });
  });

  describe('[Hours]', function () {
    it('should return "1 hour ago" if the comments date diff is greater than 59 minutes and lower than 2 hours', function () {
      expect(dff(new Date(YEAR, MONTH, DAY, 4, MINUTE))).toBe('1 hour ago');
      expect(dff(new Date(YEAR, MONTH, DAY, 4))).toBe('1 hour ago');
      expect(dff(new Date(YEAR, MONTH, DAY, 3, 28))).toBe('1 hour ago');
      expect(dff(new Date(YEAR, MONTH, DAY, 3, MINUTE))).not.toBe('1 hour ago');
    });

    it('should return "2 hours ago"', function () {
      expect(dff(new Date(YEAR, MONTH, DAY, 3, MINUTE))).toBe('2 hours ago');
      expect(dff(new Date(YEAR, MONTH, DAY, 2, 28))).toBe('2 hours ago');
      expect(dff(new Date(YEAR, MONTH, DAY, 2, MINUTE))).not.toBe('2 hours ago');
    });

    it('should return "4 hours ago"', function () {
      expect(dff(new Date(YEAR, MONTH, DAY, 1, MINUTE))).toBe('4 hours ago');
      expect(dff(new Date(YEAR, MONTH, DAY, 0, 28))).toBe('4 hours ago');
      expect(dff(new Date(YEAR, MONTH, DAY, 0, MINUTE))).not.toBe('4 hours ago');
    });

    it('should return "12 hours ago"', function () {
      expect(dff(new Date(YEAR, MONTH, 26, 17, MINUTE))).toBe('12 hours ago');
      expect(dff(new Date(YEAR, MONTH, 26, 17))).toBe('12 hours ago');
      expect(dff(new Date(YEAR, MONTH, 26, 16, MINUTE))).not.toBe('12 hours ago');
    });

    it('should return "23 hours ago"', function () {
      expect(dff(new Date(YEAR, MONTH, 26, HOUR, 28))).toBe('23 hours ago');
      expect(dff(new Date(YEAR, MONTH, 26, HOUR, MINUTE, 1))).toBe('23 hours ago');
      expect(dff(new Date(YEAR, MONTH, 26, HOUR, MINUTE))).not.toBe('23 hours ago');
    });
  });

  describe('[Days]', function () {
    it('should return "1 day ago"', function () {
      expect(dff(new Date(YEAR, MONTH, 26, HOUR, MINUTE))).toBe('1 day ago');
      expect(dff(new Date(YEAR, MONTH, 25, HOUR, 28))).toBe('1 day ago');
      expect(dff(new Date(YEAR, MONTH, 25, HOUR, MINUTE))).not.toBe('1 day ago');
    });

    it('should return "2 days ago"', function () {
      expect(dff(new Date(YEAR, MONTH, 25, HOUR, MINUTE))).toBe('2 days ago');
      expect(dff(new Date(YEAR, MONTH, 24, HOUR, 28))).toBe('2 days ago');
      expect(dff(new Date(YEAR, MONTH, 24, HOUR, MINUTE))).not.toBe('2 days ago');
    });

    it('should return "4 days ago"', function () {
      expect(dff(new Date(YEAR, MONTH, 23, HOUR, MINUTE))).toBe('4 days ago');
    });

    it('should return "6 days ago"', function () {
      expect(dff(new Date(YEAR, MONTH, 21, HOUR, MINUTE))).toBe('6 days ago');
    });

    it('should return "27 days ago"', function () {
      expect(dff(new Date(YEAR, 3, 30, HOUR, MINUTE))).toBe('27 days ago');
    });

    it('should should take care of the year change correctly', function () {
      // A second closer to hit the 365 days / a year.
      expect(dff(new Date(2015, MONTH, DAY, HOUR, MINUTE, 1))).toBe('365 days ago');
    });
  })

});
