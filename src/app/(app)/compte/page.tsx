import { CompteForm } from "@/components/account/compte-form";
import { PageHeader } from "@/components/layout/page-header";

export default function Page() {
    return (
        <>
            <PageHeader title="Compte" />
            <div className="max-w-md px-6 pb-6">
                <CompteForm />
            </div>
        </>
    );
}
