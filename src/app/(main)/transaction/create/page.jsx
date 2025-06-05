import React from 'react'
import { getUserAccounts } from '../../../../../action/accounts'
import { defaultCategories } from '@/data/categories';
import AddTransactionForm from '../_components/transaction-form';
import { getTransaction } from '../../../../../action/transction';

const AddTransactionPage = async ({searchParams}) => {

  const accounts = await getUserAccounts();
  const editId =  searchParams?.edit;
  console.log(editId)



  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
      <h1 className="text-5xl text-blue-500 mb-8">{editId?"Edit":"Add"} Transaction</h1>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
</div>
  )
}

export default AddTransactionPage