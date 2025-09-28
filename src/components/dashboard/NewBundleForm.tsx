import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockProducts } from '@shared/mock-data';
import type { Product } from '@shared/types';
const bundleSchema = z.object({
  name: z.string().min(3, 'Bundle name must be at least 3 characters'),
  productIds: z.array(z.string()).min(1, 'Please select at least one product'),
});
export type BundleFormData = z.infer<typeof bundleSchema>;
interface NewBundleFormProps {
  onSubmit: (data: BundleFormData) => void;
  onCancel: () => void;
}
const productsArray = Object.values(mockProducts);
export function NewBundleForm({ onSubmit, onCancel }: NewBundleFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BundleFormData>({
    resolver: zodResolver(bundleSchema),
    defaultValues: {
      name: '',
      productIds: [],
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Bundle Name</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="e.g., Fitness Starter Pack"
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Products</Label>
        <ScrollArea className="h-64 rounded-md border p-4">
          <Controller
            name="productIds"
            control={control}
            render={({ field }) => (
              <div className="space-y-4">
                {productsArray.map((product: Product) => (
                  <div key={product.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={product.id}
                      checked={field.value?.includes(product.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...(field.value || []), product.id])
                          : field.onChange(
                              (field.value || []).filter((value) => value !== product.id)
                            );
                      }}
                    />
                    <label
                      htmlFor={product.id}
                      className="flex items-center gap-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <span>
                        {product.name} - ${product.price.toFixed(2)}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          />
        </ScrollArea>
        {errors.productIds && (
          <p className="text-xs text-destructive mt-1">{errors.productIds.message}</p>
        )}
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Bundle</Button>
      </div>
    </form>
  );
}