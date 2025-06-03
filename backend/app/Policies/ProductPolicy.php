<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Product;
use App\Models\User;

class ProductPolicy
{


    /**
     * Determine whether the user can permanently delete the model.
     */
    public function modify(User $user, Product $product): Response
    {
        return $user->id === $product->user_id ? Response::allow() : Response::deny('You are not authorized to update this product.');
    }
}
