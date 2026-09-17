import { ParametresForm } from "@/components/account/parametres-form";
import { PageHeader } from "@/components/layout/page-header";

export default function Page() {
    return (
        <>
            <PageHeader title="Paramètres" />
            <div className="max-w-md px-6 pb-6">
                <ParametresForm />
            </div>
        </>
    );
}
