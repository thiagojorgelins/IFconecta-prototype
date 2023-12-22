import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryColor'
})
export class CategoryColorPipe implements PipeTransform {

  transform(category: string): string {
    const categoryColors: { [key: string]: string } = {
      technology: '#4069ff',
      travel: '#cc662f',
      gastronomy: '#fac30c',
      health: '#26ebb9',
      science: '#3b99d9',
      fashion: '#b11fcf',
      sports: '#f56600',
      movies: '#d91f1f',
      business: '#6254e3',
      culture: '#6eb828',
      music: '#d61167',
    }
    const defaultColor = '#595959'
    const color = categoryColors[category]
    return color || defaultColor
  }

}
