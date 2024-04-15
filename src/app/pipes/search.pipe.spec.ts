import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  let pipe: SearchPipe;

  beforeEach(() => {
    pipe = new SearchPipe();
  });

  it('create an instance', () => {
    const pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the original array if there is no value', () => {
    const items = [{ name: 'Pikachu' }, { name: 'Bulbasaur' }];
    expect(pipe.transform(items)).toEqual(items);
  });

  it('should return null', () => {
    expect(pipe.transform(null, 'Pikachu')).toBeNull();
  });

  it('should filter correctly based on value', () => {
    const items = [
      { name: 'Pikachu', type: 'Electric' },
      { name: 'Bulbasaur', type: 'Grass' }
    ];
    const filtered = pipe.transform(items, 'Pikachu');
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Pikachu');
  });
});
