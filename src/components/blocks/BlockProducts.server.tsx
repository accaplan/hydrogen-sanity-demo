import type {PortableTextBlock} from '@portabletext/types';
import clsx from 'clsx';
import type {SanityModuleProducts} from '../../types';
import ModuleProduct from '../modules/ModuleProduct.server';

type Props = {
  node: PortableTextBlock & SanityModuleProducts;
};

export default function BlockProducts({node}: Props) {
  const multipleProducts = node.modules.length > 1;

  return (
    <div
      className={clsx(
        'first:mt-0', //
        'my-8 grid grid-cols-1 gap-3',
        multipleProducts ? 'md:grid-cols-2' : 'md:grid-cols-1',
      )}
    >
      {node?.modules?.map((module) => (
        <ModuleProduct
          imageAspectClassName="aspect-[320/220]"
          key={module._key}
          layout={node.layout}
          module={module}
        />
      ))}
    </div>
  );
}
