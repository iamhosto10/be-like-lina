"use client";

import { useActionState, type ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { LockKeyhole, ShoppingBag } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/components/cart/CartProvider";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { createCheckout, type CheckoutState } from "@/actions/checkout";
import { departments, shipping } from "@/data/shipping";

const initial: CheckoutState = { status: "idle" };

const control =
  "w-full rounded-lg border border-input bg-card px-3 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 aria-invalid:border-destructive";

function Field({
  label,
  name,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = ComponentPropsWithoutRef<typeof Input>;

export function CheckoutForm() {
  const cart = useCart();
  const [state, formAction, pending] = useActionState(createCheckout, initial);
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};

  const input = (name: string, props: InputProps = {}) =>
    ({
      id: name,
      name,
      defaultValue: values[name],
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
      className: cn(control, "h-11"),
      ...props,
    }) as InputProps;

  if (!cart.hydrated) {
    return <p className="py-16 text-center text-muted-foreground">Cargando tu carrito…</p>;
  }

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-md py-12 text-center">
        <ShoppingBag className="mx-auto size-12 text-primary/60" strokeWidth={1.25} aria-hidden />
        <h2 className="mt-4 text-2xl font-bold">Tu carrito está vacío</h2>
        <p className="mt-2 text-muted-foreground">
          Agrega productos desde la tienda para continuar.
        </p>
        <Button className="mt-6" size="lg" nativeButton={false} render={<Link href="/tienda" />}>
          Ir a la tienda
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-14">
      <input type="hidden" name="cart" value={JSON.stringify(cart.lines)} />
      {/* Trampa para robots: una persona no la ve ni la llena. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">No llenar</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-10">
        {state.status === "error" && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-medium"
          >
            {state.message}
          </p>
        )}

        <fieldset className="space-y-4">
          <legend className="mb-2 text-xl font-bold">Tus datos</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre" name="firstName" error={errors.firstName}>
              <Input {...input("firstName", { autoComplete: "given-name", required: true })} />
            </Field>
            <Field label="Apellido" name="lastName" error={errors.lastName}>
              <Input {...input("lastName", { autoComplete: "family-name", required: true })} />
            </Field>
          </div>
          <Field
            label="Correo electrónico"
            name="email"
            error={errors.email}
            hint="Aquí te llega la confirmación del pedido."
          >
            <Input
              {...input("email", {
                type: "email",
                autoComplete: "email",
                inputMode: "email",
                required: true,
              })}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Celular (WhatsApp)" name="phone" error={errors.phone}>
              <Input
                {...input("phone", {
                  type: "tel",
                  autoComplete: "tel",
                  inputMode: "tel",
                  placeholder: "300 123 4567",
                  required: true,
                })}
              />
            </Field>
            <Field
              label="Cédula (opcional)"
              name="document"
              error={errors.document}
              hint="Algunas transportadoras la piden."
            >
              <Input {...input("document", { inputMode: "numeric", autoComplete: "off" })} />
            </Field>
          </div>
        </fieldset>

        {cart.hasPhysical ? (
          <fieldset className="space-y-4">
            <legend className="mb-2 text-xl font-bold">Dirección de envío</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Departamento" name="department" error={errors.department}>
                <select
                  // Se vuelve a montar con el valor devuelto: React 19 reinicia el formulario tras cada envío.
                  key={values.department ?? "sin-elegir"}
                  id="department"
                  name="department"
                  required
                  defaultValue={values.department ?? ""}
                  aria-invalid={errors.department ? true : undefined}
                  className={cn(control, "h-11")}
                >
                  <option value="" disabled>
                    Elige…
                  </option>
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Ciudad" name="city" error={errors.city}>
                <Input {...input("city", { autoComplete: "address-level2", required: true })} />
              </Field>
            </div>
            <Field label="Dirección" name="address" error={errors.address}>
              <Input
                {...input("address", {
                  autoComplete: "street-address",
                  placeholder: "Calle 10 # 5-20",
                  required: true,
                })}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Barrio, apartamento… (opcional)" name="details" error={errors.details}>
                <Input {...input("details")} />
              </Field>
              <Field label="Indicaciones (opcional)" name="notes" error={errors.notes}>
                <Input {...input("notes", { placeholder: "Dejar en portería…" })} />
              </Field>
            </div>
          </fieldset>
        ) : (
          <p className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            Tu pedido es solo de productos digitales: no necesitas dirección de envío. Te los
            enviamos por correo.
          </p>
        )}

        <div>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="terms"
              required
              defaultChecked={Boolean(values.terms)}
              aria-invalid={errors.terms ? true : undefined}
              className="mt-0.5 size-5 shrink-0 accent-primary"
            />
            <span>
              Acepto los{" "}
              <Link
                href="/terminos-y-condiciones"
                target="_blank"
                className="font-medium text-primary underline underline-offset-4"
              >
                términos y condiciones
              </Link>{" "}
              y la{" "}
              <Link
                href="/politica-de-privacidad"
                target="_blank"
                className="font-medium text-primary underline underline-offset-4"
              >
                política de privacidad
              </Link>
              .
            </span>
          </label>
          {errors.terms && (
            <p role="alert" className="mt-1 text-sm text-destructive">
              {errors.terms}
            </p>
          )}
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm md:p-6">
          <h2 className="mb-3 text-xl font-bold">Resumen</h2>
          <OrderSummary
            items={cart.items}
            subtotal={cart.subtotal}
            shipping={cart.shipping}
            total={cart.total}
            hasPhysical={cart.hasPhysical}
          />
          {cart.hasPhysical && (
            <p className="mt-3 text-xs text-muted-foreground">{shipping.note}</p>
          )}

          <Button type="submit" size="xl" className="mt-5 w-full" disabled={pending}>
            <LockKeyhole aria-hidden />
            {pending ? "Un momento…" : cart.demo ? "Pagar (demostración)" : "Pagar con ePayco"}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {cart.demo
              ? "Modo demostración: el pago se simula, no hay cobro real."
              : "Pagas en la ventana segura de ePayco: tarjetas, PSE, Nequi y más."}
          </p>
          <p className="mt-3 text-center text-sm">
            <Link
              href="/tienda"
              className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Seguir comprando
            </Link>
          </p>
        </div>
      </aside>
    </form>
  );
}
