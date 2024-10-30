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
    'ff-CM',
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
    ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
    ['{1} {0}', u, u, u],
    [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
    ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'],
    'FCFA',
    'Mbuuɗi Seefaa BEAC',
    { 'JPY': ['JP¥', '¥'], 'USD': ['US$', '$'] },
    plural,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmYtQ00uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9mZi1DTS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCwrRkFBK0Y7QUFDL0YsK0ZBQStGO0FBQy9GLDRGQUE0RjtBQUM1RixnR0FBZ0c7QUFDaEcsZ0dBQWdHO0FBQ2hHLGlGQUFpRjtBQUVqRixNQUFNLENBQUMsR0FBRyxTQUFTLENBQUM7QUFFcEIsU0FBUyxNQUFNLENBQUMsQ0FBUztJQUN2QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqQyxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7QUFFRCxlQUFlO0lBQ2IsT0FBTztJQUNQLENBQUMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0Q7UUFDRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNuQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztRQUNqRCxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQztRQUNoRixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztLQUNsRDtJQUNELENBQUM7SUFDRDtRQUNFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDNUQsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztRQUNwRjtZQUNFLE9BQU87WUFDUCxPQUFPO1lBQ1AsT0FBTztZQUNQLFFBQVE7WUFDUixRQUFRO1lBQ1IsT0FBTztZQUNQLE9BQU87WUFDUCxNQUFNO1lBQ04sUUFBUTtZQUNSLFVBQVU7WUFDVixPQUFPO1lBQ1AsT0FBTztTQUNSO0tBQ0Y7SUFDRCxDQUFDO0lBQ0QsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUNELENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNOLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDO0lBQ2xELENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDO0lBQ3BELENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUM7SUFDOUQsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUM7SUFDNUMsTUFBTTtJQUNOLG9CQUFvQjtJQUNwQixFQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUM7SUFDMUMsTUFBTTtDQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gKipOb3RlKio6IExvY2FsZSBmaWxlcyBhcmUgZ2VuZXJhdGVkIHRocm91Z2ggQmF6ZWwgYW5kIG5ldmVyIHBhcnQgb2YgdGhlIHNvdXJjZXMuIFRoaXMgaXMgYW5cbi8vIGV4Y2VwdGlvbiBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuIFdpdGggdGhlIEd1bHAgc2V0dXAgd2UgbmV2ZXIgZGVsZXRlZCBvbGQgbG9jYWxlIGZpbGVzXG4vLyB3aGVuIHVwZGF0aW5nIENMRFIsIHNvIG9sZGVyIGxvY2FsZSBmaWxlcyB3aGljaCBoYXZlIGJlZW4gcmVtb3ZlZCwgb3IgcmVuYW1lZCBpbiB0aGUgQ0xEUlxuLy8gZGF0YSByZW1haW5lZCBpbiB0aGUgcmVwb3NpdG9yeS4gV2Uga2VlcCB0aGVzZSBmaWxlcyBjaGVja2VkLWluIHVudGlsIHRoZSBuZXh0IG1ham9yIHRvIGF2b2lkXG4vLyBwb3RlbnRpYWwgYnJlYWtpbmcgY2hhbmdlcy4gSXQncyB3b3J0aCBub3RpbmcgdGhhdCB0aGUgbG9jYWxlIGRhdGEgZm9yIHN1Y2ggZmlsZXMgaXMgb3V0ZGF0ZWRcbi8vIGFueXdheS4gZS5nLiB0aGUgZGF0YSBpcyBtaXNzaW5nIHRoZSBkaXJlY3Rpb25hbGl0eSwgdGhyb3dpbmcgb2ZmIHRoZSBpbmRpY2VzLlxuXG5jb25zdCB1ID0gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBwbHVyYWwobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgbGV0IGkgPSBNYXRoLmZsb29yKE1hdGguYWJzKG4pKTtcbiAgaWYgKGkgPT09IDAgfHwgaSA9PT0gMSkgcmV0dXJuIDE7XG4gIHJldHVybiA1O1xufVxuXG5leHBvcnQgZGVmYXVsdCBbXG4gICdmZi1DTScsXG4gIFtbJ3N1YmFrYScsICdraWtpacmXZSddLCB1LCB1XSxcbiAgdSxcbiAgW1xuICAgIFsnZCcsICdhJywgJ20nLCAnbicsICduJywgJ20nLCAnaCddLFxuICAgIFsnZGV3JywgJ2FhyZMnLCAnbWF3JywgJ25qZScsICduYWEnLCAnbXdkJywgJ2hiaSddLFxuICAgIFsnZGV3bycsICdhYcmTbmRlJywgJ21hd2JhYXJlJywgJ25qZXNsYWFyZScsICduYWFzYWFuZGUnLCAnbWF3bmRlJywgJ2hvb3JlLWJpaXInXSxcbiAgICBbJ2RldycsICdhYcmTJywgJ21hdycsICduamUnLCAnbmFhJywgJ213ZCcsICdoYmknXSxcbiAgXSxcbiAgdSxcbiAgW1xuICAgIFsncycsICdjJywgJ20nLCAncycsICdkJywgJ2snLCAnbScsICdqJywgJ3MnLCAneScsICdqJywgJ2InXSxcbiAgICBbJ3NpaScsICdjb2wnLCAnbWJvJywgJ3NlZScsICdkdXUnLCAna29yJywgJ21vcicsICdqdWsnLCAnc2x0JywgJ3lhcicsICdqb2wnLCAnYm93J10sXG4gICAgW1xuICAgICAgJ3NpaWxvJyxcbiAgICAgICdjb2x0ZScsXG4gICAgICAnbWJvb3knLFxuICAgICAgJ3NlZcmXdG8nLFxuICAgICAgJ2R1dWphbCcsXG4gICAgICAna29yc2UnLFxuICAgICAgJ21vcnNvJyxcbiAgICAgICdqdWtvJyxcbiAgICAgICdzaWlsdG8nLFxuICAgICAgJ3lhcmtvbWFhJyxcbiAgICAgICdqb2xhbCcsXG4gICAgICAnYm93dGUnLFxuICAgIF0sXG4gIF0sXG4gIHUsXG4gIFtbJ0gtSScsICdDLUknXSwgdSwgWydIYWRlIElpc2EnLCAnQ2FnZ2FsIElpc2EnXV0sXG4gIDEsXG4gIFs2LCAwXSxcbiAgWydkL00veScsICdkIE1NTSwgeScsICdkIE1NTU0geScsICdFRUVFIGQgTU1NTSB5J10sXG4gIFsnSEg6bW0nLCAnSEg6bW06c3MnLCAnSEg6bW06c3MgeicsICdISDptbTpzcyB6enp6J10sXG4gIFsnezF9IHswfScsIHUsIHUsIHVdLFxuICBbJywnLCAnwqAnLCAnOycsICclJywgJysnLCAnLScsICdFJywgJ8OXJywgJ+KAsCcsICfiiJ4nLCAnTmFOJywgJzonXSxcbiAgWycjLCMjMC4jIyMnLCAnIywjIzAlJywgJyMsIyMwLjAwwqDCpCcsICcjRTAnXSxcbiAgJ0ZDRkEnLFxuICAnTWJ1dcmXaSBTZWVmYWEgQkVBQycsXG4gIHsnSlBZJzogWydKUMKlJywgJ8KlJ10sICdVU0QnOiBbJ1VTJCcsICckJ119LFxuICBwbHVyYWwsXG5dO1xuIl19