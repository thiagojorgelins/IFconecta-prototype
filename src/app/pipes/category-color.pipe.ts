import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryColor'
})
export class CategoryColorPipe implements PipeTransform {

  transform(category: string): string {
    const categoryColors: { [key: string]: string } = {
      technology: '#1324a8',
      travel: '#943600',
      gastronomy: '#d1a402',
      health: '#2bab3c',
      science: '#3b99d9',
      fashion: '#b11fcf',
      sports: '#bd6624',
      movies: '#d91f1f',
      business: '#0d064f',
      culture: '#6eb828',
      music: '#4e32a8',
    }
    const defaultColor = '#595959'
    const color = categoryColors[category]
    return color || defaultColor
  }

}
