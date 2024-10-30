/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// **Note**: Locale files are generated through Bazel and never part of the sources. This is an
// exception for backwards compatibility. With the Gulp setup we never deleted old locale files
// when updating CLDR, so older locale files which have been removed, or renamed in the CLDR
// data remained in the repository. We keep these files checked-in until the next major to avoid
// potential breaking changes. It's worth noting that the locale data for such files is outdated
// anyway. e.g. the data is missing the directionality, throwing off the indices.
const u = undefined;
function plural(n) {
    let i = Math.floor(Math.abs(n));
    if (i === 0 || i === 1)
        return 1;
    return 5;
}
export default [
    'ff-MR',
    [['subaka', 'kikiiɗe'], u, u],
    u,
    [
        ['d', 'a', 'm', 'n', 'n', 'm', 'h'],
        ['dew', 'aaɓ', 'maw', 'nje', 'naa', 'mwd', 'hbi'],
        ['dewo', 'aaɓnde', 'mawbaare', 'njeslaare', 'naasaande', 'mawnde', 'hoore-biir'],
        ['dew', 'aaɓ', 'maw', 'nje', 'naa', 'mwd', 'hbi'],
    ],
    u,
    [
        ['s', 'c', 'm', 's', 'd', 'k', 'm', 'j', 's', 'y', 'j', 'b'],
        ['sii', 'col', 'mbo', 'see', 'duu', 'kor', 'mor', 'juk', 'slt', 'yar', 'jol', 'bow'],
        [
            'siilo',
            'colte',
            'mbooy',
            'seeɗto',
            'duujal',
            'korse',
            'morso',
            'juko',
            'siilto',
            'yarkomaa',
            'jolal',
            'bowte',
        ],
    ],
    u,
    [['H-I', 'C-I'], u, ['Hade Iisa', 'Caggal Iisa']],
    1,
    [6, 0],
    ['d/M/y', 'd MMM, y', 'd MMMM y', 'EEEE d MMMM y'],
    ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
    ['{1} {0}', u, u, u],
    [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
    ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'],
    'UM',
    'Ugiyya Muritani',
    { 'JPY': ['JP¥', '¥'], 'MRU': ['UM'], 'USD': ['US$', '$'] },
    plural,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmYtTVIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9mZi1NUi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCwrRkFBK0Y7QUFDL0YsK0ZBQStGO0FBQy9GLDRGQUE0RjtBQUM1RixnR0FBZ0c7QUFDaEcsZ0dBQWdHO0FBQ2hHLGlGQUFpRjtBQUVqRixNQUFNLENBQUMsR0FBRyxTQUFTLENBQUM7QUFFcEIsU0FBUyxNQUFNLENBQUMsQ0FBUztJQUN2QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqQyxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7QUFFRCxlQUFlO0lBQ2IsT0FBTztJQUNQLENBQUMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0Q7UUFDRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNuQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztRQUNqRCxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQztRQUNoRixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztLQUNsRDtJQUNELENBQUM7SUFDRDtRQUNFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDNUQsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztRQUNwRjtZQUNFLE9BQU87WUFDUCxPQUFPO1lBQ1AsT0FBTztZQUNQLFFBQVE7WUFDUixRQUFRO1lBQ1IsT0FBTztZQUNQLE9BQU87WUFDUCxNQUFNO1lBQ04sUUFBUTtZQUNSLFVBQVU7WUFDVixPQUFPO1lBQ1AsT0FBTztTQUNSO0tBQ0Y7SUFDRCxDQUFDO0lBQ0QsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUNELENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNOLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDO0lBQ2xELENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUM7SUFDeEQsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQztJQUM5RCxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQztJQUM1QyxJQUFJO0lBQ0osaUJBQWlCO0lBQ2pCLEVBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBQztJQUN6RCxNQUFNO0NBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyAqKk5vdGUqKjogTG9jYWxlIGZpbGVzIGFyZSBnZW5lcmF0ZWQgdGhyb3VnaCBCYXplbCBhbmQgbmV2ZXIgcGFydCBvZiB0aGUgc291cmNlcy4gVGhpcyBpcyBhblxuLy8gZXhjZXB0aW9uIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS4gV2l0aCB0aGUgR3VscCBzZXR1cCB3ZSBuZXZlciBkZWxldGVkIG9sZCBsb2NhbGUgZmlsZXNcbi8vIHdoZW4gdXBkYXRpbmcgQ0xEUiwgc28gb2xkZXIgbG9jYWxlIGZpbGVzIHdoaWNoIGhhdmUgYmVlbiByZW1vdmVkLCBvciByZW5hbWVkIGluIHRoZSBDTERSXG4vLyBkYXRhIHJlbWFpbmVkIGluIHRoZSByZXBvc2l0b3J5LiBXZSBrZWVwIHRoZXNlIGZpbGVzIGNoZWNrZWQtaW4gdW50aWwgdGhlIG5leHQgbWFqb3IgdG8gYXZvaWRcbi8vIHBvdGVudGlhbCBicmVha2luZyBjaGFuZ2VzLiBJdCdzIHdvcnRoIG5vdGluZyB0aGF0IHRoZSBsb2NhbGUgZGF0YSBmb3Igc3VjaCBmaWxlcyBpcyBvdXRkYXRlZFxuLy8gYW55d2F5LiBlLmcuIHRoZSBkYXRhIGlzIG1pc3NpbmcgdGhlIGRpcmVjdGlvbmFsaXR5LCB0aHJvd2luZyBvZmYgdGhlIGluZGljZXMuXG5cbmNvbnN0IHUgPSB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIHBsdXJhbChuOiBudW1iZXIpOiBudW1iZXIge1xuICBsZXQgaSA9IE1hdGguZmxvb3IoTWF0aC5hYnMobikpO1xuICBpZiAoaSA9PT0gMCB8fCBpID09PSAxKSByZXR1cm4gMTtcbiAgcmV0dXJuIDU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgJ2ZmLU1SJyxcbiAgW1snc3ViYWthJywgJ2tpa2lpyZdlJ10sIHUsIHVdLFxuICB1LFxuICBbXG4gICAgWydkJywgJ2EnLCAnbScsICduJywgJ24nLCAnbScsICdoJ10sXG4gICAgWydkZXcnLCAnYWHJkycsICdtYXcnLCAnbmplJywgJ25hYScsICdtd2QnLCAnaGJpJ10sXG4gICAgWydkZXdvJywgJ2FhyZNuZGUnLCAnbWF3YmFhcmUnLCAnbmplc2xhYXJlJywgJ25hYXNhYW5kZScsICdtYXduZGUnLCAnaG9vcmUtYmlpciddLFxuICAgIFsnZGV3JywgJ2FhyZMnLCAnbWF3JywgJ25qZScsICduYWEnLCAnbXdkJywgJ2hiaSddLFxuICBdLFxuICB1LFxuICBbXG4gICAgWydzJywgJ2MnLCAnbScsICdzJywgJ2QnLCAnaycsICdtJywgJ2onLCAncycsICd5JywgJ2onLCAnYiddLFxuICAgIFsnc2lpJywgJ2NvbCcsICdtYm8nLCAnc2VlJywgJ2R1dScsICdrb3InLCAnbW9yJywgJ2p1aycsICdzbHQnLCAneWFyJywgJ2pvbCcsICdib3cnXSxcbiAgICBbXG4gICAgICAnc2lpbG8nLFxuICAgICAgJ2NvbHRlJyxcbiAgICAgICdtYm9veScsXG4gICAgICAnc2VlyZd0bycsXG4gICAgICAnZHV1amFsJyxcbiAgICAgICdrb3JzZScsXG4gICAgICAnbW9yc28nLFxuICAgICAgJ2p1a28nLFxuICAgICAgJ3NpaWx0bycsXG4gICAgICAneWFya29tYWEnLFxuICAgICAgJ2pvbGFsJyxcbiAgICAgICdib3d0ZScsXG4gICAgXSxcbiAgXSxcbiAgdSxcbiAgW1snSC1JJywgJ0MtSSddLCB1LCBbJ0hhZGUgSWlzYScsICdDYWdnYWwgSWlzYSddXSxcbiAgMSxcbiAgWzYsIDBdLFxuICBbJ2QvTS95JywgJ2QgTU1NLCB5JywgJ2QgTU1NTSB5JywgJ0VFRUUgZCBNTU1NIHknXSxcbiAgWydoOm1tIGEnLCAnaDptbTpzcyBhJywgJ2g6bW06c3MgYSB6JywgJ2g6bW06c3MgYSB6enp6J10sXG4gIFsnezF9IHswfScsIHUsIHUsIHVdLFxuICBbJywnLCAnwqAnLCAnOycsICclJywgJysnLCAnLScsICdFJywgJ8OXJywgJ+KAsCcsICfiiJ4nLCAnTmFOJywgJzonXSxcbiAgWycjLCMjMC4jIyMnLCAnIywjIzAlJywgJyMsIyMwLjAwwqDCpCcsICcjRTAnXSxcbiAgJ1VNJyxcbiAgJ1VnaXl5YSBNdXJpdGFuaScsXG4gIHsnSlBZJzogWydKUMKlJywgJ8KlJ10sICdNUlUnOiBbJ1VNJ10sICdVU0QnOiBbJ1VTJCcsICckJ119LFxuICBwbHVyYWwsXG5dO1xuIl19