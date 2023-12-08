import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryTranslate'
})
export class CategoryTranslatePipe implements PipeTransform {

  transform(category: string): string {
    const translatedCategories: { [key: string]: string } = {
      technology: 'Tecnologia',
      travel: 'Viagem',
      gastronomy: 'Gastronomia',
      health: 'Saúde',
      science: 'Ciência',
      fashion: 'Moda',
      sports: 'Esportes',
      music: 'Música',
      business: 'Negócios',
      movies: 'Filmes',
      culture: 'Cultura',
    }
    const value = translatedCategories[category]
    return value || category
  }

}
