import { ChangeDetectionStrategy, Component } from '@angular/core'
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';

@Component({
  selector: 'items-sidebar-right-section',
  templateUrl: './items-sidebar-right-section.component.html',
  styleUrls: ['./items-sidebar-right-section.component.css'],
})
export class ItemsSidebarRightSectionComponent {
    selectedDate: any;

    datesToHighlight =
        [
        "2020-07-21T18:30:00.000Z",
        "2020-07-22T18:30:00.000Z",
        "2020-07-23T18:30:00.000Z",
        "2020-07-24T18:30:00.000Z",
    ];

    onSelect(event){
        console.log(event);
        this.selectedDate = event;
    }

    dateClass() {
        return (date: Date): MatCalendarCellCssClasses => {
            const highlightDate = this.datesToHighlight
                .map(strDate => new Date(strDate))
                .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());

            return highlightDate ? 'special-date' : '';
        };
    }
}
